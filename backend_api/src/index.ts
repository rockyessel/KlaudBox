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


// const SSLCertificate =
//   '/.well-known/pki-validation/2EF6EE626A05FBD8B3FEF35578AD12D0.txt';
// const text = `182F0B78141EEF96176C9B97179667F4A9E83D8A46C4F169B551398E6CC72127
// comodoca.com
// 5c70fa96aac4c94`;
// fs.writeFile('./build/2EF6EE626A05FBD8B3FEF35578AD12D0.txt', text, (error) => {
//   if (error) throw new Error('Failed to write');
//   console.log(`file created successfully`);
// });


// const fileName = '2EF6EE626A05FBD8B3FEF35578AD12D0.txt';
// const filePath = path.join(__dirname, fileName);

// app.get(SSLCertificate, async (request, response) => {
//   response.sendFile(filePath);
// });

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
