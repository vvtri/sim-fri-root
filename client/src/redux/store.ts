import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import counterReducer from './slices/counter.slice';
import postSlice from './slices/post.slice';
import profileSlice from './slices/profile.slice';
import verifyUserReducer from './slices/verify-user.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    verifyUser: verifyUserReducer,
    profile: profileSlice,
    post: postSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
