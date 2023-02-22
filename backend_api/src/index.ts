'use-strict';
import Express, { response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import http from 'http';
import { startCronJob } from './utils/configs/cron-schedule';
import { connectDatabase } from './utils/configs/database';
import fs from 'fs';
import path from 'path';

dotenv.config();

// @desc Connecting to database
connectDatabase();

// @desc Routes Imports
import GuestFile from './routes/guest-file';
// @desc PORT
const PORT = process.env.PORT || 7789;
export const baseURL = `http://localhost:${PORT}`;

const app: Express.Application = Express();
const server = http.createServer(app);

const SSLCertificate =
  '/.well-known/pki-validation/814CD9BFC3EE32F0EA2771E91A1E1739.txt.txt';
const text = `67CCD9937DC85157F02C3F1E899C45A097DACA7FC0A7987B38C83BF380AA50BE
comodoca.com
6d7abcd149cb2e8`;
fs.writeFile(
  './build/814CD9BFC3EE32F0EA2771E91A1E1739.txt.txt',
  text,
  (error) => {
    if (error) throw new Error('Failed to write');
    console.log(`file created successfully`);
  }
);

const fileName = '814CD9BFC3EE32F0EA2771E91A1E1739.txt.txt';
const filePath = path.join(__dirname, fileName);

app.get(SSLCertificate, async (request, response) => {
  response.sendFile(filePath);
});

app.use(cors({ origin: '*' }));
app.use(morgan('tiny'));
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));
app.use('/uploads', Express.static(__dirname + '/uploads'));

app.use('/v1/', GuestFile);

startCronJob();

server.listen(PORT, () => {
  console.log(`Server is running on ${baseURL}`);
});
