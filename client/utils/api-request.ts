import { GuestFileModelProps } from '@/interface';
import https from 'https';
import axios from 'axios';

export const API_URI = process.env.NEXT_PUBLIC_API_URI;

console.log('API_URI', API_URI);


const ca_path = `${process.env.NODE_ENV === 'development' ? 'http://localhost:3000/52.4.183.221.chained+root.crt' : process.env.NODE_ENV === 'production' ? 'https://klaudbox.vercel.app/52.4.183.221.chained+root.crt' : '' }`
const key_path = `${process.env.NODE_ENV === 'development' ? 'http://localhost:3000/private.key' : process.env.NODE_ENV === 'production' ? 'https://klaudbox.vercel.app/private.key' : '' }`
const cer_path = `${process.env.NODE_ENV === 'development' ? 'http://localhost:3000/certificate.crt' : process.env.NODE_ENV === 'production' ? 'https://klaudbox.vercel.app/certificate.crt' : '' }`

const ca =  await fetch(ca_path).then(res => res.arrayBuffer()).then(buf => Buffer.from(buf));
const key = await  fetch(key_path).then(res => res.arrayBuffer()).then(buf => Buffer.from(buf));
const cert = await fetch(cer_path).then(res => res.arrayBuffer()).then(buf => Buffer.from(buf));

const agent = new https.Agent({
  ca: [ca],
  key: key,
  cert: cert,
});

export const instance = axios.create({
  httpsAgent: agent,
});

export const GuestFileUploadPost = async (file_object: any, fn: any) => {
  const response = await instance({
    method: 'POST',
    url: `${API_URI}v1/guests`,
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
  const response = await instance.get(`${API_URI}v1/guests/${file_code}`);

  const data_ = await response.data

  return data_;
};

export const GuestFileSlug = async (path: string) => {
 const response = await instance.get(`${API_URI}v1/guests/path/${path}`);

 const data_ = await response.data

 return data_;
};

export const GetAllFiles = async () => {
 const response = await instance.get(`${API_URI}v1/guests/all`);

 const data_ = await response.data

 return data_;
};

export const DeleteGuestFile = async (identifier: string) => {
 const response = await instance({
   method: 'DELETE',
   url: `${API_URI}v1/guests/${identifier}`,
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
   console.log(error);
 }
};
