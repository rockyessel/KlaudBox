'use strict';
import Express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { startCronJob } from './utils/configs/cron-schedule';
import { connectDatabase } from './utils/configs/database';

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

// @desc Guest Route
app.use('/v1/', GuestFile);
// @desc user Route
app.use('/v1/', UserFile);

startCronJob();

app.listen(PORT, () => {
  console.log(`Server is running on ${baseURL}`);
});
