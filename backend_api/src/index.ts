'use strict';
import Express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import https from 'https';
import { startCronJob } from './utils/configs/cron-schedule';
import { connectDatabase } from './utils/configs/database';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app: Express.Application = Express();

// @desc Connecting to database
connectDatabase();

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

const key = fs.readFileSync(
  path.join(__dirname, '..', 'build', './private.key')
);
const cert = fs.readFileSync(
  path.join(__dirname, '..', 'build', './certificate.crt')
);

console.log(key, cert);

const cred = {
  key,
  cert,
};

app.listen(PORT, () => {
  console.log(`Server is running on ${baseURL}`);
});

const httpsServer = https.createServer(cred, app);
httpsServer.listen(8443);
