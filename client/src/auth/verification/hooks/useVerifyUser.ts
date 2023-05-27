import { MutationOptions, useMutation } from 'react-query';
import { IAuthTokenRes } from '../../common/interfaces/res/auth-token.res.interface';
import { resendVerification, verifyUser } from '../services/index.services';
import {
  IResendVerificationPayload,
  IVerifyUserPayload,
} from '../interfaces/payload.interface';

export const useResendVerification = (
  opts: Pick<
    MutationOptions<IAuthTokenRes, any, IResendVerificationPayload>,
    'onError' | 'onSuccess'
  >,
) => {
  return useMutation(
    (payload: IResendVerificationPayload) => resendVerification(payload),
    { ...opts },
  );
};

export const useVerifyUser = (
  opts: Pick<
    MutationOptions<IAuthTokenRes, any, IVerifyUserPayload>,
    'onError' | 'onSuccess'
  >,
) => {
  return useMutation((payload: IVerifyUserPayload) => verifyUser(payload), {
    ...opts,
  });
};
