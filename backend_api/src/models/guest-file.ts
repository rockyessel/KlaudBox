import Mongoose from 'mongoose';

const GuestFileModel = new Mongoose.Schema({
  // Required
  url: { type: String, require: [true, 'This field is required'] },
  size: { type: Number, required: true },
  identifier: {
    type: String,
    require: [true, 'This field is required'],
    unique: true,
  },
  originalFilename: { type: String, require: [true, 'This field is required'] },
  mimeType: { type: String, require: [true, 'This field is required'] },
  extension: { type: String, require: [true, 'This field is required'] },
  cms_id: { type: String, require: [true, 'This field is required'] },
  createdAt: { type: String, require: [true, 'This field is required'] },
  updatedAt: { type: String, require: [true, 'This field is required'] },
  uploadId: { type: String, require: [true, 'This field is required'] },
  delete_after: { type: String, require: [false, 'This field is not required'] },

  // Options
  title: { type: String, require: true },
  description: { type: String, require: true },
  secure: { type: String, require: true },
});

export const GuestFile = Mongoose.model('GuestFile', GuestFileModel);
