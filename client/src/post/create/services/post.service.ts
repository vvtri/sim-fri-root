import axiosClient from '../../../common/configs/axios.config';
import {
  createPostUrl,
  getListMyPostUrl,
  getListPostUrl,
} from '../../common/apis/index.api';
import {
  ICreatePostReq,
  IGetListPostsReq,
} from '../../common/interfaces/req/post.req.interface';
import {
  ICreatePostResRes,
  IGetListMyPostsRes,
  IGetListPostsRes,
} from '../../common/interfaces/res/post.res.interface';

export const getListMyPosts = async () => {
  return axiosClient.get<any, IGetListMyPostsRes>(getListMyPostUrl);
};

export const getListPosts = async (data: IGetListPostsReq) => {
  return axiosClient.get<any, IGetListPostsRes>(getListPostUrl, {
    params: data,
  });
};

export const createPost = async (data: ICreatePostReq) => {
  return axiosClient.post<any, ICreatePostResRes>(createPostUrl, data);
};
