import { GuestFileModelProps } from '@/interface';
import https from 'https';
import axios, { AxiosError } from 'axios';
import { next_day } from './functions';
import { useGuestContext } from '@/context/guest-context';

export const API_URI = process.env.NEXT_PUBLIC_API_URI;

const ca_path = 'https://klaudbox.vercel.app/52.4.183.221.chained+root.crt';
const key_path = 'https://klaudbox.vercel.app/private.key';
const cer_path = 'https://klaudbox.vercel.app/certificate.crt';

const ca = await fetch(ca_path)
  .then((res) => res.arrayBuffer())
  .then((buf) => Buffer.from(buf));
const key = await fetch(key_path)
  .then((res) => res.arrayBuffer())
  .then((buf) => Buffer.from(buf));
const cert = await fetch(cer_path)
  .then((res) => res.arrayBuffer())
  .then((buf) => Buffer.from(buf));

const agent = new https.Agent({
  ca: [ca],
  key: key,
  cert: cert,
});

export const instance = axios.create({
  httpsAgent: agent,
  // timeout: 20000,
});

export const GuestFileUploadPost = async (
  file_object: any,
  setProgress: any
) => {
  try {
    const response = await instance({
      method: 'POST',
      url: `${API_URI}v1/guests`,
      data: file_object,
      onUploadProgress: (data) => {
        const total: number = data?.total || 0;
        setProgress(Math.round((100 * data?.loaded) / total));
      },
    });

    const data_ = await response.data;

    return data_;
  } catch (error) {
    const err = error as AxiosError;
    return err;
  }
};

export const singleGuestFile = async (file_code: string) => {
  try {
    const response = await instance.get(`${API_URI}v1/guests/${file_code}`);

    const data_ = await response.data;

    return data_;
  } catch (error) {
    const err = error as AxiosError;
    return err;
  }
};

export const GuestFileSlug = async (path: string) => {
  try {
    const response = await instance.get(`${API_URI}v1/guests/path/${path}`);

    const data_ = await response.data;

    return data_;
  } catch (error) {
    const err = error as AxiosError;
    return err;
  }
};

export const GetAllFiles = async () => {
  try {
    const response = await instance.get(`${API_URI}v1/guests/all`);

    const data_ = await response.data;

    return data_;
  } catch (error) {
    const err = error as AxiosError;
    return err;
  }
};

export const DeleteGuestFile = async (identifier: string) => {
  try {
    const response = await instance({
      method: 'DELETE',
      url: `${API_URI}v1/guests/${identifier}`,
      headers: { 'Content-Type': 'application/json' },
    });

    const data_ = await response.data;

    return data_;
  } catch (error) {
    const err = error as AxiosError;
    return err;
  }
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
          `${API_URI}v1/guests/${identifier}`
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
    const err = error as AxiosError;
    return err;
  }
};

export const logout = () => {
  window.localStorage.removeItem('user');
};
