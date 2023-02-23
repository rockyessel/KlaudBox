import axios from 'axios';

const API_URI = import.meta.env.VITE_AWS_EC2_URI;
// const API_URI = 'http://localhost:7789/';

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

export const guestFileDownload = async (file_code: string) => {
  const response = await fetch(`${API_URI}v1/guest/${file_code}`);

  const data_ = await response.json();

  return data_;
};

export const GetAllFiles = async () => {
  const response = await fetch(`${API_URI}v1/guest/all`);

  const data_ = await response.json();

  return data_;
};
