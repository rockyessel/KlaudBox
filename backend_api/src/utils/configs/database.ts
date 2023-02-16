import mongoose from 'mongoose';

const url = `mongodb+srv://everfile:everfile@everfile.nuopw6d.mongodb.net/?retryWrites=true&w=majority`;

export const connectDatabase = async () => {
  try {
    await mongoose.connect(url);
    mongoose.set('strictQuery', true);
    console.log(`MONGODB is connected`);
  } catch (error) {
    console.log(error);
  }
};
