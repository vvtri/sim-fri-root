import { MutationOptions, useMutation } from 'react-query';
import { IUpdateUserProfileReq } from '../../common/interfaces/req/user-profile.req.interface';
import { IUpdateUserProfileRes } from '../../common/interfaces/res/user-profile.res.interface';
import { updateProfile } from '../services/profile-detail.service';

export function useUpdateProfile(
  opts: Pick<
    MutationOptions<IUpdateUserProfileRes, any, IUpdateUserProfileReq>,
    'onError' | 'onSuccess'
  >,
) {
  return useMutation({
    mutationFn: (data: IUpdateUserProfileReq) => updateProfile(data),
    ...opts,
  });
}
