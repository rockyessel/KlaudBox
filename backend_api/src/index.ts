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

const options = {
  key: fs.readFileSync('private.key'),
  cert: fs.readFileSync('certificate.crt'),
};

// @desc Guest Route
app.use('/v1/guest', GuestFile);
// @desc user Route
app.use('/v1/user', UserFile);

startCronJob();

https
  .createServer(options, app)
  .listen(8443, () => console.log(`Server is running on ${baseURL}`));
