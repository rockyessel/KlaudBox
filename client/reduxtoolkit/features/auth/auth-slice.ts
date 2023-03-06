import { createSlice } from '@reduxjs/toolkit';
import { register, login, logout } from './auth-request';
import { AuthStateProps } from '@/interface';

const user =
  typeof window !== 'undefined' && `${localStorage.getItem('user')}`
    ? JSON.parse(`${localStorage.getItem('user')}`)
    : null;

const initialState = {
  loading: false,
  user,
  error: '',
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state: AuthStateProps) => {
      state.loading = false;
      state.success = false;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    // register user
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // login user
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    // logout
    // .addCase(logout.pending, (state) => {
    //   state.loading = true;
    // })
    // .addCase(logout.fulfilled, (state) => {
    //   state.user = null;
    //   state.loading = false;
    // });
  },
});

export default authSlice.reducer;
