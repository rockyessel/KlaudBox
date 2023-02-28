import Mongoose from 'mongoose';

const UserSchema = new Mongoose.Schema({
  name: String,
});

export const GuestFile = Mongoose.model('UserFile', UserSchema);
