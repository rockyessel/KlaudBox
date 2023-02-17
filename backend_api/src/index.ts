'use-strict';
import Express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import http from 'http';
import { connectDatabase } from './utils/configs/database';

dotenv.config();

// @desc Connecting to database
connectDatabase();

// @desc Routes Imports
import GuestFile from './routes/guest-file';
import { startCronJob } from './utils/configs/cron-schedule';

// @desc PORT
const PORT = process.env.PORT || 7789;
export const baseURL = `http://localhost:${PORT}`;

const app: Express.Application = Express();
const server = http.createServer(app);

console.log('index', process.env.MONGODB_URI);

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
