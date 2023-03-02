import { useGuestContext } from '@/context/GuestContext';
import { GuestFileModelProps } from '@/interface';
import axios from 'axios';

// const API_URI = process.env.NEXT_PUBLIC_API_URI;
const API_URI = `http://localhost:7789/`;

export const GuestFileUploadPost = async (file_object: any, fn: any) => {
  const response = await axios({
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
  const response = await axios({
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
  const delete_response = Promise.all(
    identifiers?.map(async (identifier) => {
      const response = await axios.delete(`${API_URI}v1/guest/${identifier}`);
      const data_ = await response.data;

      return data_;
    })
  );

  return delete_response;
};
