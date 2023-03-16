import { createSlice } from '@reduxjs/toolkit';
import { get_all_files, post_files } from './files-request';
import { UserFilesProps } from '@/interface';

interface Props {
  files: UserFilesProps[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: Props = {
  files: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: { reset: (state) => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(get_all_files.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(get_all_files.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.files = [...state.files, ...action.payload.files];
        window.localStorage.setItem(
          'cachingUserFiles',
          JSON.stringify([...action.payload.files])
        );
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
        state.files.push(...action?.payload?.result);
      })
      .addCase(post_files.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        // state.message = action.payload;
        console.log(action.error.message);
      });
  },
});

export const { reset } = filesSlice.actions;
export default filesSlice.reducer;
