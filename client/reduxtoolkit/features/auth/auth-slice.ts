import { createSlice } from '@reduxjs/toolkit';
import { register, login, logout } from './auth-request';

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
  reducers: {
    logout: (state) => {
      localStorage.removeItem('user');
      state.user = null;
    },
  },
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
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // login user
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.error = '';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // logout user
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.user = null;
        state.error = '';
        state.success = false;
      })
      .addCase(logout.fulfilled, (state) => {
         state.isLoading = false;
         state.user = null;
      })
      .addCase(logout.rejected, (state) => {
         state.user = null;
         state.error = 'Redux logout failed';
      });
  },
});
// export const { logout } = authSlice.actions;
export default authSlice.reducer;
