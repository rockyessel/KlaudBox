import axios from 'axios';

const API_URI = import.meta.env.VITE_AWS_EC2_URI;

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
