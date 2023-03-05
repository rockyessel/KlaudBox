import multer from 'multer';
import path from 'path';
import fs from 'fs';
import axios from 'axios';
import https from 'https';

export const shuffleString = (input: string): string => {
  const shuffleRatio = Math.random() * 0.8;
  let characters = input.split('');
  characters = characters.sort(() => Math.random() - shuffleRatio);
  return characters.join('');
};

export const generateString = (): string => {
  const characters = shuffleString(
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  );
  const length = Math.floor(Math.random() * 6) + 5;
  const usedChars: string[] = [];
  let result = '';

  for (let i = 0; i < length; i++) {
    let index: number;

    do {
      index = Math.floor(Math.random() * characters.length);
    } while (usedChars.includes(characters[index]));

    result += characters[index];
    usedChars.push(characters[index]);
  }

  return result;
};

export const stripUniqueChars = (input: string, delimiter: string): string => {
  const chars = input.split('');
  const charCounts: Record<string, number> = {};

  // Count the number of occurrences of each character
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    if (!charCounts.hasOwnProperty(char)) {
      charCounts[char] = 0;
    }
    charCounts[char]++;
  }

  // Filter out any characters that occur only once
  const filteredChars = chars.filter((char) => charCounts[char] > 1);

  // Join the filtered characters using the specified delimiter
  return filteredChars.join(delimiter);
};

const storageEngine = multer.diskStorage({
  destination: (_req, _, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replaceAll(' ', '-')}`);
  },
});

export const upload = multer({ storage: storageEngine });

const storageFileEngine = multer.memoryStorage();
export const file_upload = multer({ storage: storageFileEngine });

export const next_day = (
  createdAt_date: Date,
  number_of_days: number
): Date => {
  const day_in_ms = 24 * 60 * 60 * 1000 * number_of_days;
  const createdAt_in_ms = createdAt_date.getTime();

  const nextDay_date = new Date(createdAt_in_ms + day_in_ms);

  const time_in_ms = createdAt_date.getTime() % day_in_ms;

  const nextDay = new Date(
    nextDay_date.getFullYear(),
    nextDay_date.getMonth(),
    nextDay_date.getDate(),
    0,
    0,
    0,
    time_in_ms
  );

  return nextDay;
};

export const handleFileDeletion = (
  directory: string,
  file_to_delete: string
) => {
  fs.readdir(directory, (error, files) => {
    if (error) {
      console.log(error);
      throw new Error('Could not read directory');
    }

    files.forEach((file) => {
      const file_path = path.join(directory, file);

      fs.stat(file_path, (error, stat) => {
        if (error) {
          console.log(error);
          throw new Error('File do not exist');
        }

        if (stat.isDirectory()) {
          handleFileDeletion(file_path, file_to_delete);
        } else if (file === file_to_delete) {
          fs.unlink(file_path, (error) => {
            if (error) {
              console.log(error);
              throw new Error('Could not delete file');
            }

            console.log(`Deleted ${file_path}`);
          });
        }
      });
    });
  });
};

export const handleDeletionOfAllFiles = (directory: string) => {
  fs.readdir(directory, (error, files) => {
    if (error) {
      console.log(error);
      throw new Error('Could not read directory');
    }

    files.forEach((file) => {
      const file_path = path.join(directory, file);

      fs.stat(file_path, (error, stat) => {
        if (error) {
          console.log(error);
          throw new Error('File do not exist');
        }

        if (stat.isDirectory()) {
          handleDeletionOfAllFiles(file_path);
        } else {
          fs.unlink(file_path, (error) => {
            if (error) {
              console.log(error);
              throw new Error('Could not delete file');
            }

            console.log(`Deleted ${file_path}`);
          });
        }
      });
    });
  });
};
const agent = new https.Agent({
  ca: fs.readFileSync('52.4.183.221.chained+root.crt'),
  key: fs.readFileSync('private.key'),
  cert: fs.readFileSync('certificate.crt'),
});

export const instance = axios.create({
  httpsAgent: agent,
});

export const GuestScheduleDeletion = async () => {
  try {
    const baseURL = `https://52.4.183.221`;
    // const baseURL = 'https://localhost:8080';

    const { data: endpoints } = await instance.get(`${baseURL}/v1/guests/all`);

    Promise.all(
      endpoints?.all_file?.map(async (endpoint: any) => {
        const createdAt_ms = new Date(endpoint.createdAt).getTime();

        const expire_date = next_day(
          new Date(endpoint.createdAt),
          Number(endpoint.delete_after)
        ).toISOString();

        const today_in_ms = new Date().getTime();

        const expire_date_ms = new Date(expire_date).getTime();
        // console.log('expire_date_ms', expire_date_ms);

        const expect_expire_date = expire_date_ms - createdAt_ms;
        // console.log('expect_expire_date', expect_expire_date);

        const difference_in_ms = today_in_ms - createdAt_ms;
        // console.log('difference_in_ms', difference_in_ms);

        const difference_in_days = Math.floor(
          difference_in_ms / expect_expire_date
        );
        // console.log('difference_in_days', difference_in_days);

        if (difference_in_days >= 1) {
          await instance.delete(`${baseURL}/v1/guests/${endpoint?.identifier}`);
          console.log('deleted', `${endpoint?.identifier}`);
        }
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const CreatedDirectory = (path: string) => {
  // Create the root directory
  // const subDirPath = `${path}/${sub_path}`;

  // if(fs.stat)

  fs.mkdirSync(path, { recursive: true });

  // Create a sub-directory
  // fs.mkdirSync(subDirPath, { recursive: true });

  // Log the success message
  console.log(`Directories created`);
};
