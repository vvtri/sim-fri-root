import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ProfileState {
  tabValue: number;
  editProfile: {
    isShowModal: boolean;
    avatar: {
      url: string;
      file?: File;
    };
  };
}

const initialState: ProfileState = {
  tabValue: 1,
  editProfile: { isShowModal: false, avatar: { url: '' } },
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileTabValue: (state, action: PayloadAction<number>) => {
      state.tabValue = action.payload;
    },
    setEditProfile: (
      state,
      action: PayloadAction<Partial<ProfileState['editProfile']>>,
    ) => {
      state.editProfile = { ...state.editProfile, ...action.payload };
    },
    setEditProfileModal: (
      state,
      action: PayloadAction<ProfileState['editProfile']['isShowModal']>,
    ) => {
      state.editProfile.isShowModal = action.payload;
    },
    setEditProfileAvatar: (
      state,
      action: PayloadAction<ProfileState['editProfile']['avatar']>,
    ) => {
      state.editProfile.avatar = action.payload;
    },
  },
});

export const {
  setProfileTabValue,
  setEditProfileModal,
  setEditProfileAvatar,
  setEditProfile,
} = profileSlice.actions;
export const profileTabValueSelector = (state: RootState) =>
  state.profile.tabValue;
export const editProfileSelector = (state: RootState) =>
  state.profile.editProfile;

export default profileSlice.reducer;
