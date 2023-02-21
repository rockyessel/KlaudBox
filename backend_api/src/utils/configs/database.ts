import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const url = `${process.env.MONGODB_URI}`;
export const connectDatabase = async () => {
  try {
    await mongoose.connect(url);
    mongoose.set('strictQuery', true);
    console.log(`MONGODB is connected`);
  } catch (error) {
    console.log(error);
  }
};
