import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import counterReducer from './slices/counter.slice';
import verifyUserReducer from './slices/verify-user.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    verifyUser: verifyUserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
