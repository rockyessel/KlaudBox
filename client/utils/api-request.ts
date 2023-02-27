import axios from 'axios';

const API_URI = process.env.NEXT_PUBLIC_API_URI;
// const API_URI = 'http://localhost:7789/';

console.log('API_URI', API_URI);

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

export const GetAllFiles = async () => {
  const response = await fetch(`${API_URI}v1/guest/all`);

  const data_ = await response.json();

  return data_;
};
