import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserProfile } from '../../profile/common/models/user-profile.model';
import { getProfile } from '../../profile/detail/services/profile-detail.service';
import { RootState } from '../store';

interface AuthState {
  user: IUserProfile | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: true,
};

const fetchUserThunk = createAsyncThunk('auth/fetchUser', async () => {
  try {
    const user = await getProfile();
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
    setAuth: (state, { payload }: PayloadAction<AuthState>) => {
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
