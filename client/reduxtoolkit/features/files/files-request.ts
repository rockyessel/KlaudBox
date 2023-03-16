import { instance, API_URI } from '@/utils/api-request';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const get_all_files = createAsyncThunk(
  'files/all-files',
  async (token: string, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await instance.get(`${API_URI}v1/files`, config);

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const post_files = createAsyncThunk(
  'files/post',
  async (obj: any, thunkAPI) => {
    try {
   
      const user = JSON.parse(`${localStorage.getItem('user')}`);
      const response = await instance({
        method: 'POST',
        url: `${API_URI}v1/files`,
        data: obj.data,
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user?.token}`,
        },
        onUploadProgress: (data) => {
          const total: number = data?.total || 0;
          obj.setProgress(Math.round((100 * data?.loaded) / total));
        },
      });

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
