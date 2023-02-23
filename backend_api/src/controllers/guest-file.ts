import Express, { Request, Response } from 'express';
import { baseURL } from '..';
import path from 'path';
import { generateString, handleFileDeletion } from '../utils/services';
import { GuestFile } from '../models/guest-file';
import { Client } from '../utils/configs/sanity';
import fs from 'fs';

export const GuestPost = async (request: Request, response: Response) => {
  try {
    const SanityCMS = await Client.assets.upload(
      'file',
      fs.createReadStream(`${request.file?.path}`),
      { filename: `${request.file?.originalname.replaceAll(' ', '-')}` }
    );

    console.log('body', request.body);

    const create_guest_file = await GuestFile.create({
      url: SanityCMS?.url,
      size: SanityCMS?.size,
      identifier: generateString(),
      originalFilename: SanityCMS?.originalFilename,
      mimeType: SanityCMS?.mimeType,
      extension: SanityCMS?.extension,
      cms_id: SanityCMS?._id,
      createdAt: SanityCMS?._createdAt,
      updatedAt: SanityCMS?._updatedAt,
      uploadId: SanityCMS?.uploadId,
      title: request.body?.title === '' ? 'No title' : request.body?.title,
      description: request.body?.description === '' ? 'No description' : request.body?.description,
      isPublic: true,
      daysBeforeDelete: request.body?.daysBeforeDelete
    });

    handleFileDeletion(
      `${request.file?.destination}`,
      `${request.file?.filename}`
    );

    response.status(201).json({ file: create_guest_file, success: true });
  } catch (error) {
    response.status(500).json({
      error: 'Internal Error from server.',
      success: false,
      path: 'Guest upload',
    });
  }
};

export const GuestGet = async (request: Request, response: Response) => {
  const { identifier } = request.params;

  const find_guest_file = await GuestFile.findOne({ identifier });

  if (!find_guest_file){

    response.status(404).json({ message: 'File not found or deleted', success: false });
  }else{
    response.status(200).json({ file: find_guest_file, success: true });

  }
};

export const GuestGetAll = async (request: Request, response: Response) => {
  const all_guest_files = await GuestFile.find({});

  response.status(200).json({ all_file: all_guest_files, success: true });
};

export const GuestDelete = async (request: Request, response: Response) => {
  try {
    const { identifier } = request.params;

    const find_file = await GuestFile.findOne({ identifier });

    if (!find_file) {
      return response
        .status(404)
        .json({ error: 'File not found', success: false });
    }

    // Delete from CMS
    const deleted_file_cms = await Client.delete(`${find_file?.cms_id}`);
    // Delete from MongoDB
    const deleted_file = await find_file.delete();

    response
      .status(204)
      .json({ success: true, db: identifier, cms: deleted_file_cms });

    if (!response.headersSent) {
      response.status(204).json({ success: true, deleted_file });
    }
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ error: 'Internal server error', success: false });
  }
};
