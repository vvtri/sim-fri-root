import { MutationOptions, useMutation } from 'react-query';
import { IAuthTokenRes } from '../../common/interfaces/res/auth-token.res.interface';
import { ILoginPayload } from '../interfaces/payload.interface';
import { login } from '../services/index.services';

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
