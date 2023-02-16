import Mongoose from 'mongoose';

const GuestFileModel = new Mongoose.Schema(
  {
    file_url: { type: String, require: [true, 'This field is required'] },
    identifier: { type: String, require: [true, 'This field is required'], unique: true },
    file_name: { type: String, require: [true, 'This field is required'] },
    type: { type: String, require: [true, 'This field is required'] },
  },
  { timestamps: true },
);

export const GuestFile = Mongoose.model('GuestFile', GuestFileModel);
