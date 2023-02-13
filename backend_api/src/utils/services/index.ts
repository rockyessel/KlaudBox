import multer from 'multer';
import path from 'path';
import fs from 'fs';

export const shuffleString = (input: string): string => {
  let characters = input.split('');
  characters = characters.sort(() => Math.random() - 0.5);
  return characters.join('');
};

export const generateString = (): string => {
  let characters = shuffleString('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
  let result = '';
  const usedChars: string[] = [];
  let index: number;

  characters = characters
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');

  for (let i = 0; i < 5; i++) {
    do {
      index = Math.floor(Math.random() * characters.length);
    } while (usedChars.includes(characters[index]));

    result += characters[index];
    usedChars.push(characters[index]);
  }

  return result;
};

const storageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    switch (file.mimetype) {
      case 'image/jpeg':
      case 'image/png':
        cb(null, path.join(__dirname, '../../uploads/images'));
        break;
      case 'application/pdf':
        cb(null, path.join(__dirname, '../../uploads/pdfs/'));
        break;
      case 'video/mp4':
      case 'video/quicktime':
      case 'video/x-msvideo':
      case 'video/3gpp':
      case 'video/x-ms-wmv':
        cb(null, path.join(__dirname, '../../uploads/videos/'));
        break;
      case 'audio/mpeg':
      case 'audio/basic':
      case 'audio/mid':
      case 'audio/x-pn-realaudio':
        cb(null, path.join(__dirname, '../../uploads/audio/'));
        break;
      default:
        cb(null, path.join(__dirname, '../../uploads/others/'));
        break;
    }
  },
  filename: (req, file, cb) => {
    const name = `${Date.now()}-${file.originalname}`;
    name.replace(' ', '_');
    cb(null, name);
  },
});

export const upload = multer({ storage: storageEngine });
