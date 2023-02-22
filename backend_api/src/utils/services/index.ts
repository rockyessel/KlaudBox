import multer from 'multer';
import path from 'path';
import fs from 'fs';
import axios from 'axios';
import { baseURL } from '../..';

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

export const GuestScheduleDeletion = async () => {
  const { data: endpoints } = await axios.get(`${baseURL}/v1/guest/all`);

  Promise.all(
    endpoints?.all_file?.map(async (endpoint: any) => {
      const createdAt_ms = new Date(endpoint.createdAt).getTime();

      const expire_date = next_day(
        new Date(endpoint.createdAt),
        1
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
        await axios.delete(`${baseURL}/v1/guest/${endpoint?.identifier}`);
        console.log('deleted', `${endpoint?.identifier}`);
      }
    })
  );
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

// const directory = path.join(__dirname, '..', 'uploads', `${type}`);

// const storageEngine = multer.diskStorage({
//   destination: (_req, file, cb) => {
//     switch (file.mimetype) {
//       case 'image/jpeg':
//       case 'image/png':
//       case 'image/gif':
//       case 'image/bmp':
//       case 'image/webp':
//       case 'image/tiff':
//       case 'image/x-icon':
//       case 'image/svg+xml':
//         cb(null, path.join(__dirname, '../../uploads/images'));
//         break;
//       case 'application/pdf':
//         cb(null, path.join(__dirname, '../../uploads/pdf/'));
//         break;
//       case 'video/mp4':
//       case 'video/quicktime':
//       case 'video/x-msvideo':
//       case 'video/3gpp':
//       case 'video/x-ms-wmv':
//       case 'video/x-flv':
//       case 'video/x-matroska':
//       case 'video/webm':
//       case 'video/ogg':
//         cb(null, path.join(__dirname, '../../uploads/videos/'));
//         break;
//       case 'audio/mpeg':
//       case 'audio/basic':
//       case 'audio/mid':
//       case 'audio/x-wav':
//       case 'audio/webm':
//       case 'audio/ogg':
//       case 'audio/x-aiff':
//       case 'audio/x-pn-realaudio':
//         cb(null, path.join(__dirname, '../../uploads/audio/'));
//         break;
//       default:
//         cb(null, path.join(__dirname, '../../uploads/others/'));
//         break;
//     }
//   },
//   filename: (_req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname.replaceAll(' ', '-')}`);
//   },
// });

export const service = () => {
  const cert_content = `-----BEGIN CERTIFICATE-----
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
fIAA
-----END CERTIFICATE-----


`;

  const key_content = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAjGstTJjRRd0+73rGx/YFbmlFSDKMt+A93gJix6EFyI7h5ic5
YFKkszlp1CXVR9NA5vVPfYhmnez2ppfIY9WgBPia39UiMGX5dAkYpgT73RPTD428
G8qsfhqWqSoAD1rTb2R7ac3gbGe+W3eE2TrKyRyJOD85KfRYuBfu8Jz6RPgrzOLH
f817wwvhb8coHiSXOk4XuaFcCRNldiRRyTYsRoDrBDaf8rivB4M10Ro9MN5khsB+
q30NnnQcIS4UnQ/Q6dGbqr93S/MOBGQet9hNtrNmmbBUdfn59PRSJuw70tu6mTR5
G4+DsRRWCZqvTxnjyQHviVBIFCqJDNGtegO2SQIDAQABAoIBACqMJzO4cmDrAzDp
UOYyI78q4rVXq8/jgJuOuYOnxOracJSeegI3yHQOB4Ui2Zdj6ZyR5D4zYHSl4q7j
+vJVPqGC+tqr6ComHAoO34seo3p/kUp7Ne5t4Qps4A3uDgqZCMwN9F9A5Km0Xbe1
ZWm1KND7dpC2h4mw4lkV127NAgB3hv7vhNBZLiE0Zo8DldjPKcP0RUqldGZeWYLo
9ym14YkY5yzlj6fFR1VWA5DVv2Gj9fpuff8GrzNW0/QDGMmk7YI22g3hEFfbvYiP
MwkUIs3FFMxnlgYPONgloA1BbWo8SuZoVXL6IN0Wc1cOqerNRR0SvKj6Yq4inyGo
1fe54wECgYEAzOu1i023J+93Oixah5TuGZqB85+jsW1Kp5JIYmlfOzPvLJ01vGJ2
wEjmUVCsbwF+DXXcLqtuh69MeR38e9seBN+9fUOIs4TWWWAIm5FcAU8kkqc3KGLL
sud7xd3HPa/JkaWEA3YvJfDTRdgyPZaVK18mHD2Bg3N+AAPC5ZDUUHkCgYEAr2t/
BbElbh7IdGAKqojj86UH6nbt36we9jxQjQdxG7sbhmDbjEVLTat9gMMJEXYBLgOo
uOruf2ko717+YZkbmi+dNC4xc1k5QVyyaAx7Kl9B27BPHU5JB1nO+GH69Ss43xmm
3r8jn5XS9s2TcBPaPm3vMR/VhxOmTiSr/Cp4QFECgYEAs1jAZRE5cbxFryZOfUc9
NC9j+OMJEypCInMG4wqyDFChzXwyIZRTtmqXGSfwIp89wW4brMThUeN8nKw/4+6c
UUu4vj8zD1r9du9z2SPZUFQCAFBVGAWPnh621zAJRtXpJo2kApuXHC+v2PskzX5T
Q8hcxG6YQYH9Duo700t0ZpECgYA5w88/Q5dMzOw7jkjU4WEXIVga+HDaf+ZuNWxd
FH9Fn3av6INDjKoAeKFKXm9FBbPbwC62Pf6tjCaDtKdV4kI5osZEoZV9I3t8L5c8
Nif0ywt32XYj81yPBB7oofMu+r2ukdbmcNC9Q2wGA6oydQcgGblzVsVMxsaz4tWT
ozSYEQKBgQCwru4Yd9VYgt/2zi1WyR0l4Xo5IWhOeUIGJTu+gM/RJOSasjaRy7KU
ALgXCXJcPee3E0aJQ3Q2hjxIpHJIE9WHGj8zjyAKF6NBYZJwFWU0TFvRKjmOjHkB
8mp17DGcMIdML22DwrfhYEzUIbULsWmUGeMp24aNHP2Deh/xSYdunA==
-----END RSA PRIVATE KEY-----


`;

  fs.writeFile('./build/certificate.crt', cert_content, (error) => {
    if (error) throw new Error('Failed to write');
    console.log(`file created successfully`);
  });

  fs.writeFile('./build/private.key', key_content, (error) => {
    if (error) throw new Error('Failed to write');
    console.log(`file created successfully`);
  });
};
