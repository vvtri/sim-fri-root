import axiosClient from '../../../common/configs/axios.config';
import {
  resendVerificationUrl,
  verifyUserUrl,
} from '../../common/apis/index.api';
import { IAuthTokenRes } from '../../common/interfaces/res/auth-token.res.interface';
import {
  IResendVerificationPayload,
  IVerifyUserPayload,
} from '../interfaces/payload.interface';

export const verifyUser = async (payload: IVerifyUserPayload) => {
  return axiosClient.post<any, IAuthTokenRes>(verifyUserUrl, payload);
};

export const resendVerification = async (
  payload: IResendVerificationPayload,
) => {
  return axiosClient.post<any, IAuthTokenRes>(resendVerificationUrl, payload);
};
