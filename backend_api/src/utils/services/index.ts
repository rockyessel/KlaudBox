import multer from 'multer';
import path from 'path';
import fs from 'fs';
import axios from 'axios';
import https from 'https';

export const shuffleString = (input: string): string => {
  let characters = input.split('');
  characters = characters.sort(() => Math.random() - 0.5);
  return characters.join('');
};

export const generateString = (): string => {
  let characters = shuffleString(
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  );
  let result = '';
  const used_chars: string[] = [];
  let index: number;

  characters = characters
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');

  for (let i = 0; i < 5; i++) {
    do {
      index = Math.floor(Math.random() * characters.length);
    } while (used_chars.includes(characters[index]));

    result += characters[index];
    used_chars.push(characters[index]);
  }

  return result;
};

const storageEngine = multer.diskStorage({
  destination: (_req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replaceAll(' ', '-')}`);
  },
});

export const upload = multer({ storage: storageEngine });

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
    const baseURL = `https://localhost:8443`;

    const { data: endpoints } = await instance.get(`${baseURL}/v1/guest/all`);

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
          await instance.delete(`${baseURL}/v1/guest/${endpoint?.identifier}`);
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
