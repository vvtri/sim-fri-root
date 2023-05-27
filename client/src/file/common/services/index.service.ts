import axiosClient from '../../../common/configs/axios.config';
import { presignFileUrl } from '../apis/index.api';
import { IPresignFileReq } from '../interfaces/req/file.req.interface';
import { IPresignFileRes } from '../interfaces/res/file.res.interface';

export const presignFile = (payload: IPresignFileReq) => {
  return axiosClient.post<any, IPresignFileRes>(presignFileUrl, payload);
};
