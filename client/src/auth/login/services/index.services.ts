import axiosClient from '../../../common/configs/axios.config';
import { currentUserUrl, loginUrl } from '../../common/apis/index.api';
import { IAuthTokenRes } from '../../common/interfaces/res/auth-token.res.interface';
import { IUser } from '../../common/interfaces/res/user.res.interface';
import { ILoginPayload } from '../interfaces/payload.interface';

export const login = async (payload: ILoginPayload) => {
  return axiosClient.post<any, IAuthTokenRes>(loginUrl, payload);
};

export const fetchUser = async () => {
  return axiosClient.get<any, IUser>(currentUserUrl);
};
