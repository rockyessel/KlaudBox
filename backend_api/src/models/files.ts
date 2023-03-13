import Mongoose from 'mongoose';

const FilesModelSchema = new Mongoose.Schema({
  user:{type: Mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  url: { type: String, require: [true, 'This field is required'] },
  size: { type: Number, required: true },
  identifier: { type: String, require: [true, 'This field is required'], unique: false },
  originalFilename: { type: String, require: [true, 'This field is required'] },
  mimeType: { type: String, require: [true, 'This field is required'] },
  extension: { type: String, require: [true, 'This field is required'] },
  tags: { type: String, require: [false, 'This field is required'] },
  path: { type: String, require: [false, 'This field is required'] },
  delete_after: { type: String, require: [false, 'This field is required'] },
  title: { type: String, require: false },
  description: { type: String, require: false },
  secure: { type: String, require: false },
},
  {
    timestamps: true,
  });

export const FilesModel = Mongoose.model('FilesModel', FilesModelSchema);
