import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/reduxtoolkit/features/auth/auth-slice';
import filesReducer from '@/reduxtoolkit/features/files/files-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    files: filesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
