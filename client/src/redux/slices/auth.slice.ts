import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../auth/common/interfaces/res/user.res.interface';
import { fetchUser } from '../../auth/login/apis/index.api';
import { RootState } from '../store';

interface AuthState {
  user: IUser | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: true,
};

const fetchUserThunk = createAsyncThunk('auth/fetchUser', async () => {
  try {
    const user = await fetchUser();
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (
      state,
      { payload }: PayloadAction<{ user: IUser | null; isLoading: boolean }>,
    ) => {
      state.user = payload.user;
      state.isLoading = payload.isLoading;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchUserThunk.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export { fetchUserThunk };
export const { setAuth, setLoading } = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
export const authUserSelector = (state: RootState) => state.auth.user;
export const authLoadingSelector = (state: RootState) => state.auth.user;

export default authSlice.reducer;
