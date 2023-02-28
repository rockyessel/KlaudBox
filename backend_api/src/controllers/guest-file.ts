import { Request, Response } from 'express';
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

    console.log(request.body);

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
      title: request.body?.title,
      description: request.body?.description,
      secure: request.body?.secure,
      delete_after: request.body?.delete_after,
    });

    await handleFileDeletion(
      `${request.file?.destination}`,
      `${request.file?.filename}`
    );

    response.status(201).json({ file: create_guest_file, success: true });
  } catch (error) {
    response.status(500).json({
      error: 'Internal server error',
      success: false,
      error_msg: error,
      handler: 'Post Handler',
    });
  }
};

export const GuestGet = async (request: Request, response: Response) => {
  try {
    const { identifier } = request.params;

    if (identifier === '' || !identifier) {
      response
        .status(404)
        .json({ message: 'File no was not entered', success: false });
    }

    const find_guest_file = await GuestFile.findOne({ identifier });

    if (!find_guest_file) {
      response
        .status(404)
        .json({ message: 'File not found or deleted', success: false });
    } else {
      response.status(200).json({ file: find_guest_file, success: true });
    }
  } catch (error) {
    response.status(500).json({
      error: 'Internal server error',
      success: false,
      error_msg: error,
      handler: 'SingleGet Handler',
    });
  }
};

export const GuestFileSlug = async (request: Request, response: Response) => {
  try {
    const { cms_id } = request.params;

    if (cms_id === '' || !cms_id) {
      response
        .status(404)
        .json({ message: 'File no was not entered', success: false });
    }

    const find_guest_file = await GuestFile.findOne({ cms_id });

    if (!find_guest_file) {
      response
        .status(404)
        .json({ message: 'File not found or deleted', success: false });
    } else {
      response.status(200).json({ file: find_guest_file, success: true });
    }
  } catch (error) {
    response.status(500).json({
      error: 'Internal server error',
      success: false,
      error_msg: error,
      handler: 'SingleGet Handler',
    });
  }
};

export const GuestGetAll = async (request: Request, response: Response) => {
  try {
    const all_guest_files = await GuestFile.find({});
    response.status(200).json({ all_file: all_guest_files, success: true });
  } catch (error) {
    response.status(500).json({
      error: 'Internal server error',
      success: false,
      error_msg: error,
      handler: 'GetAll Handler',
    });
  }
};

export const GuestDelete = async (request: Request, response: Response) => {
  try {
    const { identifier } = request.params;

    if (identifier === '' || !identifier) {
      response.status(404).json({
        message: 'File code/value no was not entered',
        success: false,
      });
    }

    const find_file = await GuestFile.findOne({ identifier });

    if (!find_file || find_file === undefined || null) {
      return response
        .status(404)
        .json({ error: 'File not found or has been deleted', success: false });
    }

    // Delete from CMS
    await Client.delete(`${find_file?.cms_id}`);
    // Delete from MongoDB
    await find_file.delete();

    response.status(200).json({ success: true, deleted: identifier });

    if (!response.headersSent) {
      response.status(200).json({ success: true, deleted: identifier });
    }
  } catch (error) {
    response.status(500).json({
      error: 'Internal server error',
      success: false,
      error_msg: error,
      handler: 'Delete Handler',
    });
  }
};
