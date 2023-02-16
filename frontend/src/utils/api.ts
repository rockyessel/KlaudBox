import axios from 'axios';

const API_URL = 'http://localhost:7789/v1/guest';

export const GuestFileUploadPost = async (file_object: any, fn:any) => {
  const response = await axios({
    method: 'POST',
    url: API_URL,
    data: file_object,
    onUploadProgress: (data) => {
      fn(Math.round((100 * data?.loaded) / data?.total));
    },
  });

  //   const response = await fetch('http://localhost:7789/v1/guest', {
  //     method: 'POST',
  //     // headers: { 'Content-Type': 'application/json' },
  //     body: data,
  //   });
  const data_ = await response.data;

  return data_;
};
