import axiosClient from '../../../common/configs/axios.config';
import { getProfileUrl, updateProfileUrl } from '../../common/apis/index.api';
import { IUpdateUserProfileReq } from '../../common/interfaces/req/user-profile.req.interface';
import {
  IGetUserProfileRes,
  IUpdateUserProfileRes,
} from '../../common/interfaces/res/user-profile.res.interface';

export const getProfile = async () => {
  return axiosClient.get<any, IGetUserProfileRes>(getProfileUrl);
};

export const updateProfile = async (data: IUpdateUserProfileReq) => {
  return axiosClient.patch<any, IUpdateUserProfileRes>(updateProfileUrl, data);
};
