import axiosClient from '../../../common/configs/axios.config';
import { registerUserUrl } from '../../common/apis/index.api';
import { IAuthTokenRes } from '../../common/interfaces/res/auth-token.res.interface';
import { IRegisterUserPayload } from '../interfaces/payload.interface';

export const register = async (payload: IRegisterUserPayload) => {
  return axiosClient.post<any, IAuthTokenRes>(registerUserUrl, payload);
};
