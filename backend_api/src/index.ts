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

const private_key = fs.readFileSync('./private.key');
const certificate = fs.readFileSync('./certificate.crt');

const HTTPS_Credentials = {
  key: private_key,
  certificate,
};

dotenv.config();

// @desc Connecting to database
connectDatabase();

// @desc Routes Imports
import GuestFile from './routes/guest-file';
// @desc PORT
const PORT = process.env.PORT || 7789;
export const baseURL = `http://localhost:${PORT}`;

const app: Express.Application = Express();
const HTTPS_Server = https.createServer(HTTPS_Credentials, app);

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

HTTPS_Server.listen(8443);
