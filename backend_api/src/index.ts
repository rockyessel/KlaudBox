'use strict';
import Express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { startCronJob } from './utils/configs/cron-schedule';
import { connectDatabase } from './utils/configs/database';
import https from 'https';
import fs from 'fs';

dotenv.config();

const app: Express.Application = Express();

// @desc Connecting to database
connectDatabase();

// @desc Routes Imports
import GuestFile from './routes/guest-file';
import UserFile from './routes/user-file';
// @desc PORT
const PORT = process.env.PORT || 8080;
export const baseURL = `http://localhost:${PORT}`;

app.use(cors({ origin: '*' }));
app.use(morgan('tiny'));
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));
app.use('/uploads', Express.static(__dirname + '/uploads'));

app.get('/', (req, res) => {
  res.send('Welcome');
});

const file_info = `
8A74386FD5616B0A0329AACE1AA58BA1889679F46BD2F75621031D8B8F7F9C5B
comodoca.com
859582550185405
`;

app.get(
  '/.well-known/pki-validation/D22C8D2375BDDD680A35FDDE74E4F465.txt',
  (req, res) => {
    res.send(file_info);
  }
);

// const options = {
//   key: fs.readFileSync('private.key'),
//   cert: fs.readFileSync('certificate.crt'),
// };

// @desc Guest Route
app.use('/v1/guest', GuestFile);
// @desc user Route
app.use('/v1/user', UserFile);

startCronJob();

app.listen(PORT, () => {
  console.log('Server listening on port');
});

// https
//   .createServer(options, app)
//   .listen(PORT, () => console.log(`Server is running on ${baseURL}`));
