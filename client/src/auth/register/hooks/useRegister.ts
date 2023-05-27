import { MutationOptions, useMutation } from 'react-query';
import { IAuthTokenRes } from '../../common/interfaces/res/auth-token.res.interface';
import { register } from '../services/index.services';
import { IRegisterUserPayload } from '../interfaces/payload.interface';

export const useRegister = (
  opts: Pick<
    MutationOptions<IAuthTokenRes, any, IRegisterUserPayload>,
    'onError' | 'onSuccess'
  >,
) => {
  return useMutation((payload: IRegisterUserPayload) => register(payload), {
    ...opts,
  });
};
