import Mongoose from 'mongoose';

const FilesModelSchema = new Mongoose.Schema({
  user:{ type: String, require: [true, 'User is required'] },
  url: { type: String, require: [true, 'This field is required'] },
  size: { type: Number, required: true },
  identifier: { type: String, require: [true, 'This field is required'], unique: true },
  originalFilename: { type: String, require: [true, 'This field is required'] },
  mimeType: { type: String, require: [true, 'This field is required'] },
  extension: { type: String, require: [true, 'This field is required'] },
  tags: { type: String, require: [true, 'This field is required'] },
  path: { type: String, require: [true, 'This field is required'] },
  delete_after: { type: String, require: [true, 'This field is required'] },
  title: { type: String, require: true },
  description: { type: String, require: true },
  secure: { type: String, require: true },
},
  {
    timestamps: true,
  });

export const FilesModel = Mongoose.model('FilesModel', FilesModelSchema);
