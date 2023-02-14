import Express from 'express';
import { baseURL } from '../server';

export const GuestPost = async (request: Express.Request, response: Express.Response) => {
  try {
    const mime_type = request.file?.mimetype?.split('/')[0]
    const image_path = `${baseURL}/uploads${request?.file?.path?.replaceAll('\\', '/').split('uploads').pop()}`;

    response.status(201).json({ file_url: image_path, success: true, type: mime_type });
  } catch (error) {
    response.status(500).json({ error: 'Internal Error from server.', success: false, path: 'Guest upload' });
  }
};
