'use-strict';
import Express, { response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import https from 'https';
import { startCronJob } from './utils/configs/cron-schedule';
import { connectDatabase } from './utils/configs/database';
import fs from 'fs';
import path from 'path';

// const key = fs.readFileSync('./private.key');
// const cert = fs.readFileSync('./certificate.crt');

// const cred = {
//   key,
//   cert,
// };

dotenv.config();

const app: Express.Application = Express();

// @desc Connecting to database
connectDatabase();

const SSLCertificate =
  '/.well-known/pki-validation/C6A00B6CF036DEBB512DC0F162D7AC17.txt';
const text = `49216D040068C8C945ACC6A57DE363AACA6C1837E82D0D25B6CA153151A676FD
comodoca.com
0e3ee3fdf3bf9cc`;
fs.writeFile('./build/C6A00B6CF036DEBB512DC0F162D7AC17.txt', text, (error) => {
  if (error) throw new Error('Failed to write');
  console.log(`file created successfully`);
});

const fileName = 'C6A00B6CF036DEBB512DC0F162D7AC17.txt';
const filePath = path.join(__dirname, fileName);

app.get(SSLCertificate, async (request, response) => {
  response.sendFile(filePath);
});

// @desc Routes Imports
import GuestFile from './routes/guest-file';
// @desc PORT
const PORT = process.env.PORT || 7789;
export const baseURL = `http://localhost:${PORT}`;

app.use(cors({ origin: '*' }));
app.use(morgan('tiny'));
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));
app.use('/uploads', Express.static(__dirname + '/uploads'));

app.use('/v1/', GuestFile);

startCronJob();

app.listen(PORT, () => {
  console.log(`Server is running on ${baseURL}`);
});

// const HTTPS_Server = https.createServer(cred, app);
// HTTPS_Server.listen(8443);
