import Mongoose from 'mongoose';

const UserSchema = new Mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

export const User = Mongoose.model('User', UserSchema);
