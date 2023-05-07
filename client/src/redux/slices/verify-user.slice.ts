import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface VerifyUserState {
  email: string;
  step: 'EMAIL' | 'CODE';
}

const initialState: VerifyUserState = {
  email: '',
  step: 'EMAIL',
};

const verifyUserSlice = createSlice({
  name: 'verify-user',
  initialState,
  reducers: {
    setEmail: (state, { payload }: PayloadAction<string>) => {
      state.email = payload;
    },
    setStep: (state, { payload }: PayloadAction<VerifyUserState['step']>) => {
      state.step = payload;
    },
  },
});

export const { setEmail: setVerifyUserEmail, setStep: setVerifyUserStep } = verifyUserSlice.actions;
export const verifyUserEmailSelector = (state: RootState) =>
  state.verifyUser.email;
export const verifyUserStepSelector = (state: RootState) =>
  state.verifyUser.step;

export default verifyUserSlice.reducer;
