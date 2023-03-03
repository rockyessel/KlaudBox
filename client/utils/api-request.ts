import { useGuestContext } from '@/context/GuestContext';
import { GuestFileModelProps } from '@/interface';
import axios from 'axios';
import https from 'https';
import fs from 'fs';

const agent = new https.Agent({
  ca: fs.readFileSync('../backend_api/ca_bundle.crt'),
  key: fs.readFileSync('../backend_api/private.key'),
  cert: fs.readFileSync('../backend_api/certificate.crt'),
});

const instance = axios.create({
  httpsAgent: agent,
});

const API_URI = process.env.NEXT_PUBLIC_API_URI;
// const API_URI = `http://localhost:8080/`;

export const GuestFileUploadPost = async (file_object: any, fn: any) => {
  const response = await instance({
    method: 'POST',
    url: `${API_URI}v1/guest`,
    data: file_object,
    onUploadProgress: (data) => {
      const total: number = data?.total || 0;
      fn(Math.round((100 * data?.loaded) / total));
    },
  });

  const data_ = await response.data;

  return data_;
};

export const singleGuestFile = async (file_code: string) => {
  const response = await fetch(`${API_URI}v1/guest/${file_code}`);

  const data_ = await response.json();

  return data_;
};

export const GuestFileSlug = async (path: string) => {
  const response = await fetch(`${API_URI}v1/guest/path/${path}`);

  const data_ = await response.json();

  return data_;
};

export const GetAllFiles = async () => {
  const response = await fetch(`${API_URI}v1/guest/all`);

  const data_ = await response.json();

  return data_;
};

export const PostFile = async (file_object: any) => {
  const response = await fetch(`${API_URI}v1/guest`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(file_object),
  });

  const data = await response.json();

  return data;
};

export const DeleteGuestFile = async (identifier: string) => {
  const response = await instance({
    method: 'DELETE',
    url: `${API_URI}v1/guest/${identifier}`,
    headers: { 'Content-Type': 'application/json' },
  });

  const data_ = await response.data;

  return data_;
};

export const BulkDeleteFiles = async (
  identifiers: string[],
  localCollection: GuestFileModelProps[],
  setLocalCollection: any
) => {
  try {
    const delete_response = Promise.all(
      identifiers?.map(async (identifier) => {
        const response = await instance.delete(
          `${API_URI}v1/guest/${identifier}`
        );

        if (response.status !== 200) return;

        // Remove the deleted file from the local collection
        const new_localCollection = localCollection.filter(
          (file) => file.identifier !== identifier
        );
        setLocalCollection(new_localCollection);

        return response.data;
      })
    );

    return delete_response;
  } catch (error) {
    console.log(error);
  }
};
