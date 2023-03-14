import { createSlice } from '@reduxjs/toolkit';
import { register, login } from './auth-request';

const user =
  typeof window !== 'undefined' && `${localStorage.getItem('user')}`
    ? JSON.parse(`${localStorage.getItem('user')}`)
    : null;

const initialState = {
  isLoading: false,
  user,
  error: '',
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // register user
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // login user
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});
// export const reset = authSlice.actions.reset;
export default authSlice.reducer;
