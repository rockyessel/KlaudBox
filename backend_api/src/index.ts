'use strict';
import Express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { startCronJob } from './utils/configs/cron-schedule';
import { connectDatabase } from './utils/configs/database';
import helmet from 'helmet';
import fs from 'fs';
import path from 'path';
// @desc Routes Imports
import GuestFile from './routes/guest-file';
import UserFile from './routes/user-file';
import Files from './routes/files';

const app: Express.Application = Express();

app.use(helmet.contentSecurityPolicy());

dotenv.config();

// @desc Connecting to database
connectDatabase();

// @desc PORT
const PORT = process.env.PORT || 8443;
// default 8443
const baseURL = `https://localhost:${PORT}`;

const whitelist = ['http://localhost:3000/', 'https://klaudbox.vercel.app/'];
const corsOptions: cors.CorsOptions = {
  origin: whitelist,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors({ origin: '*' }));
app.use(morgan('combined'));
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));
app.use('/uploads', Express.static(__dirname + '/uploads'));

app.get('/', (req, res) => {
  res.send('Welcome');
});

const options = {
  key: fs.readFileSync(path.join(__dirname, '../private.key')),
  cert: fs.readFileSync(path.join(__dirname, '../certificate.crt')),
};

// @desc Guest Route
app.use('/v1/guests', GuestFile);
// @desc user Route
app.use('/v1/users', UserFile);
// @desc user File Route
app.use('/v1/files', Files);

startCronJob();

app.listen(PORT, () => {
  console.log('Listening on port');
});

// https
//   .createServer(options, app)
//   .listen(8443, () => console.log(`Server is running on ${baseURL}`));
