import { Request, Response } from 'express';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { FilesModel } from '../models/files';
import { generateString, stripUniqueChars } from '../utils/services';

const url = `${process.env.KLAUDBOX_S3_BASE_URL}`;
const bucket_name = `${process.env.BUCKET_NAME}`;
const bucket_region_name = `${process.env.BUCKET_REGION_NAME}`;
const aws_iam_klaudbox_access_key = `${process.env.AWS_IAM_KLAUDBOX_ACCESS_KEY}`;
const aws_iam_klaudbox_access_secret_key = `${process.env.AWS_IAM_KLAUDBOX_ACCESS_SECRET_KEY}`;

const s3 = new S3Client({
  credentials: {
    accessKeyId: aws_iam_klaudbox_access_key,
    secretAccessKey: aws_iam_klaudbox_access_secret_key,
  },
  region: bucket_region_name,
});
const random_name = new Date().getTime();

export const FilesPost = async (request: Request, response: Response) => {
  // try {
  //   const arr_files = request?.files;

  //   request?.files?.map(async (file: any) => {
  //     const user = request.user?._id;
  //     const file_name = `${random_name}-${request.file?.originalname?.replaceAll(
  //       ' ',
  //       '-'
  //     )}`;
  //     const extension = request.file?.originalname.split('.').pop();
  //     const identifier = generateString();
  //     // const file_name_no_special_characters = stripUniqueChars(file_name, '-');

  //     const params = {
  //       Bucket: bucket_name,
  //       Key: file_name,
  //       Body: request.file?.buffer,
  //       ContentType: request.file?.mimetype,
  //     };

  //     const command = new PutObjectCommand(params);

  //     await s3.send(command);

  //     const create_file = await FilesModel.create({
  //       user: `${user}`,
  //       url: `${url}${file_name}`,
  //       size: request.file?.size,
  //       identifier,
  //       originalFilename: file_name,
  //       mimeType: request.file?.mimetype,
  //       extension,
  //       path: `${file_name}-${new Date().getTime()}-${identifier}`,
  //       title: request.body?.title,
  //       tags: '',
  //       description: request.body?.description,
  //       secure: request.body?.secure,
  //       delete_after: request.body?.delete_after,
  //     });

  //     console.log('create_file', create_file);

  //     response.status(201).json({ create_file });
  //     if (!response.headersSent) {
  //       response.status(200).json({ create_file });
  //     }
  //   });
  // } catch (error) {
  //   response.status(500).json({
  //     error: 'Internal server error',
  //     success: false,
  //     error_state: true,
  //     handler: 'Post Handler',
  //   });
  // }

  console.log('files', request.files);
  response.json(request.files);
};

export const TempFileLink = async (request: Request, response: Response) => {
  try {
    const user = request.user?._id;
    const path = request.params.path;

    const existing_file = await FilesModel.findOne({ path });

    console.log(existing_file);

    if (existing_file?.user.toString() !== user) {
      response.status(404).json({
        message: 'User is not authorized to generate temp link',
        error: true,
      });
    }

    if (existing_file === null || undefined || !existing_file) {
      response
        .status(404)
        .json({ message: 'File not found or deleted', error: true });
    } else {
      const params = {
        Bucket: bucket_name,
        Key: existing_file?.originalFilename,
      };

      const command = new GetObjectCommand(params);
      const file = await getSignedUrl(s3, command, { expiresIn: 1000 });

      response.status(201).json({ file });
    }
  } catch (error) {
    response.status(500).json({
      error: 'Internal server error',
      success: false,
      error_state: true,
      handler: 'TempFileLink',
    });
  }
};

export const FilesDelete = async (request: Request, response: Response) => {
  try {
    const user = request.user?._id;
    const filename = request.params.filename;

    const existing_file = await FilesModel.findOne({
      originalFilename: filename,
    });

    if (existing_file?.user.toString() !== user) {
      response.status(404).json({
        message: 'User is not authorized to delete this file',
        error: true,
      });
    }

    if (existing_file === null || undefined || !existing_file) {
      response.status(404).json({
        message: 'File not found or has been already deleted',
        error: true,
      });
    } else {
      const params = {
        Bucket: bucket_name,
        Key: filename,
      };

      const command = new DeleteObjectCommand(params);

      const s3_file = await s3.send(command);

      if (s3_file.$metadata.httpStatusCode === 204) {
        await existing_file.delete();
        response.status(201).json({ success: true, deleted: filename });
      }
    }
  } catch (error) {
    response.status(500).json({
      error: 'Internal server error',
      success: false,
      error_state: true,
      handler: 'FilesDelete',
    });
  }
};

export const GetAllFiles = async (request: Request, response: Response) => {
  try {
    const user = request.user?._id;
    const files = await FilesModel.find({ user }).sort({ createdAt: -1 });
    response.status(200).json({ files, success: true });
  } catch (error) {
    response.status(500).json({
      error: 'Internal server error',
      success: false,
      error_state: true,
      handler: 'GetAllFiles',
    });
  }
};

export const GuestFileSlug = async (request: Request, response: Response) => {};
