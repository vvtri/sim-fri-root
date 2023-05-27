import { MutationOptions, useMutation } from 'react-query';
import { ICreatePostReq } from '../../common/interfaces/req/post.req.interface';
import { ICreatePostResRes } from '../../common/interfaces/res/post.res.interface';
import { createPost } from '../services/post.service';

export const useCreatePost = (
  opts: Pick<
    MutationOptions<ICreatePostResRes, any, ICreatePostReq>,
    'onError' | 'onSuccess'
  >,
) => {
  return useMutation({
    mutationFn: (data: ICreatePostReq) => createPost(data),
    ...opts,
  });
};
