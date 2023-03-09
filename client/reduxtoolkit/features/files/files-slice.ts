import { createSlice } from '@reduxjs/toolkit';
import { get_all_files, post_files } from './files-request';

const initialState = {
  files: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get_all_files.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(get_all_files.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.files = action.payload;
      })
      .addCase(get_all_files.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        // state.message = action.payload;
      })
      .addCase(post_files.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(post_files.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.files = action.payload as never[]
      })
      .addCase(post_files.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        // state.message = action.payload;
      })
  },
});


export default filesSlice.reducer