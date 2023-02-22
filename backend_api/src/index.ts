'use-strict';
import Express, { response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import https from 'https';
import { startCronJob } from './utils/configs/cron-schedule';
import { connectDatabase } from './utils/configs/database';
import { service } from './utils/services';
import fs from 'fs';
import path from 'path';

const key = fs.readFileSync('./private.key');
const cert = fs.readFileSync('./certificate.crt');

const cred = {
  key,
  cert,
};

dotenv.config();

const app: Express.Application = Express();

// @desc Connecting to database
connectDatabase();

service();
console.log('build', fs.readFileSync('./private.key'));

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

const HTTPS_Server = https.createServer(cred, app);
HTTPS_Server.listen(8443);
