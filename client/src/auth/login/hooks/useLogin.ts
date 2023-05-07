import { MutationOptions, useMutation } from 'react-query';
import { IAuthTokenRes } from '../../common/interfaces/res/auth-token.res.interface';
import { login } from '../apis/index.api';
import { ILoginPayload } from '../interfaces/payload.interface';

export const useLogin = (
  opts: Pick<
    MutationOptions<IAuthTokenRes, any, ILoginPayload>,
    'onError' | 'onSuccess'
  >,
) => {
  return useMutation({
    mutationFn: (data: ILoginPayload) => login(data),
    ...opts,
  });
};
