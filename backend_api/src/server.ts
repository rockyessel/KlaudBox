'use-strict';
import Express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

// @desc Routes Imports
import GuestFile from './routes/guest-file';

// @desc PORT
const PORT = process.env.PORT || 6000;

const app: Express.Application = Express();

dotenv.config({ path: '.env' });

app.use(cors());
app.use(morgan('tiny'));
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use('/uploads', Express.static(__dirname + '/uploads'));

app.use('/v1/', GuestFile);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
