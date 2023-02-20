'use-strict';
import Express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import http from 'http';
// import fs from 'fs-extra';
import { connectDatabase } from './utils/configs/database';

dotenv.config();

// @desc Connecting to database
connectDatabase();

// @desc Routes Imports
import GuestFile from './routes/guest-file';
import { startCronJob } from './utils/configs/cron-schedule';
import { CreatedDirectory } from './utils/services';

// @desc PORT
const PORT = process.env.PORT || 7789;
export const baseURL = `http://localhost:${PORT}`;

const app: Express.Application = Express();
const server = http.createServer(app);

app.use(cors({ origin: '*' }));
app.use(morgan('tiny'));
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));
app.use('/uploads', Express.static(__dirname + '/uploads'));

app.get('/', (request, response) => {
  response.status(200).json('Success');
});

// // For Production
// fs.ensureDir('./build/uploads/audio');
// fs.ensureDir('./build/uploads/images');
// fs.ensureDir('./build/uploads/others');
// fs.ensureDir('./build/uploads/pdf');
// fs.ensureDir('./build/uploads/videos');
CreatedDirectory('./build/uploads', 'audio');
CreatedDirectory('./build/uploads', 'images');
CreatedDirectory('./build/uploads', 'others');
CreatedDirectory('./build/uploads', 'pdf');
CreatedDirectory('./build/uploads', 'videos');

// // For Development
// fs.ensureDir('./src/uploads/audio');
// fs.ensureDir('./src/uploads/images');
// fs.ensureDir('./src/uploads/others');
// fs.ensureDir('./src/uploads/pdf');
// fs.ensureDir('./src/uploads/videos');

CreatedDirectory('./src/uploads', 'audio');
CreatedDirectory('./src/uploads', 'images');
CreatedDirectory('./src/uploads', 'others');
CreatedDirectory('./src/uploads', 'pdf');
CreatedDirectory('./src/uploads', 'videos');

app.use('/v1/', GuestFile);

startCronJob();

server.listen(PORT, () => {
  console.log(`Server is running on ${baseURL}`);
});
