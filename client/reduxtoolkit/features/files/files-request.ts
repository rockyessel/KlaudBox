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
  async (files: File, thunkAPI) => {
    console.log('API_URI', API_URI);
    try {
      const user = JSON.parse(`${localStorage.getItem('user')}`);
      const response = await instance({
        method: 'POST',
        url: `${API_URI}v1/files`,
        data: files,
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
