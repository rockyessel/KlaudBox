import { instance, API_URI } from '@/utils/api-request';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const register = createAsyncThunk(
  'auth/register',
  async (formData: { email: string; password: string }, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await instance.post(
        `${API_URI}v1/users/register`,
        formData,
        config
      );
      if (response.data) {
        const { data } = response;
        localStorage.setItem('user', JSON.stringify(data));
      }

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (formData: { email: string; password: string }, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await instance.post(
        `${API_URI}v1/users/login`,
        formData,
        config
      );

      if (response.data) {
        const { data } = response;
        localStorage.setItem('user', JSON.stringify(data));
      }

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logout = () => {
  return window.localStorage.removeItem('user');
};
