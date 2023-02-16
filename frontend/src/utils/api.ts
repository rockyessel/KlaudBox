import axios from 'axios';

const API_URL = 'http://localhost:7789/v1/guest';

export const GuestFileUploadPost = async (file_object: any, fn:any) => {
  const response = await axios({
    method: 'POST',
    url: API_URL,
    data: file_object,
    onUploadProgress: (data) => {
      const total: number = data?.total || 0
      fn(Math.round((100 * data?.loaded) / total));
    },
  });


  const data_ = await response.data;

  return data_;
};
