import Express from 'express';
import { baseURL } from '..';
import path from 'path';
import { generateString, handleFileDeletion } from '../utils/services';
import { GuestFile } from '../models/guest-file';

export const GuestPost = async (request: Express.Request, response: Express.Response) => {
  try {
    const mime_type = request.file?.mimetype?.split('/')[0];
    
    const image_path = `/uploads${request?.file?.path?.replaceAll('\\', '/').split('uploads').pop()}`;

    const create_guest_file = await GuestFile.create({
      file_url: `${baseURL}${image_path}`,
      file_name: request.file?.filename,
      identifier: generateString(),
      type: mime_type,
    });

    response.status(201).json({ file: create_guest_file, success: true, type: mime_type });
  } catch (error) {
    response.status(500).json({ error: 'Internal Error from server.', success: false, path: 'Guest upload' });
  }
};

export const GuestGet = async (request: Express.Request, response: Express.Response) => {
  const { identifier } = request.params;

  const find_guest_file = await GuestFile.findOne({ identifier });

  response.status(200).json({ file: find_guest_file, success: true, type: 'image' });
};

export const GuestGetAll = async (request: Express.Request, response: Express.Response) => {
  const all_guest_files = await GuestFile.find({});

  response.status(200).json({ all_file: all_guest_files, success: true });
};

export const GuestDelete = async (request: Express.Request, response: Express.Response) => {
  const { identifier } = request.params;

  const find_file = await GuestFile.findOne({ identifier });

  if (!find_file) {
    return response.status(404).json({ error: 'File not found', success: false });
  }

  const local_file_path = find_file.file_url?.split(`${baseURL}`).pop();
  const file_type_path: string | undefined = find_file.file_url?.split('uploads/').pop();
  const type = file_type_path?.split('/').shift();

  const file_name = local_file_path?.split('/')?.splice(-1)[0];
  const directory = path.join(__dirname, '..', 'uploads', `${type}`);

  handleFileDeletion(directory, `${file_name}`);

  const deleted_file = await find_file.delete();

  console.log(deleted_file);

  response.status(204).json({ success: true, identifier });
};
