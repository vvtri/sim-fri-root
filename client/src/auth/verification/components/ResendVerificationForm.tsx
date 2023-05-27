import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  FormControl,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import FormProvider from '../../../common/components/hook-forms/FormProvider';
import { DEFAULT_MESSAGE } from '../../../common/constants/index.constant';
import { IApiError } from '../../../common/interfaces/api-error.interface';
import { AuthStatusCode } from '../../../common/status-code/auth.status-code';
import { useAppDispatch } from '../../../redux/hook';
import {
  setVerifyUserEmail,
  setVerifyUserStep,
} from '../../../redux/slices/verify-user.slice';
import { useResendVerification } from '../hooks/useVerifyUser';
import {
  IResendVerificationForm,
  resendVerificationSchema,
} from '../schemas/verify.schema';

export const ResendVerificationForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const methods = useForm<IResendVerificationForm>({
    resolver: yupResolver(resendVerificationSchema),
  });
  const { register, control, formState, handleSubmit, setError, getValues } =
    methods;
  const { errors } = formState;
  const { isLoading, mutate } = useResendVerification({
    onSuccess(data, variables, context) {
      dispatch(setVerifyUserEmail(getValues().email));
      dispatch(setVerifyUserStep('CODE'));
      router.push('/auth/verification');
    },
    onError(error, variables, context) {
      let msg = DEFAULT_MESSAGE;
      if (axios.isAxiosError(error)) {
        const res = error.response?.data as IApiError;
        switch (res.statusCode) {
          case AuthStatusCode.USER_NOT_FOUND:
            msg = 'Email không tồn tại';
            break;
          case AuthStatusCode.USER_VERIFIED:
            msg = 'Email đã được xác thực';
            break;
          case AuthStatusCode.TOO_MANY_VERIFICATION_REQUEST:
            msg =
              'Bạn đã yêu cầu xác thực quá nhiều lần, vui lòng thử lại vào ngày mai';
            break;
        }
      }
      setError('root', { message: msg });
    },
  });

  return (
    <Box
      bgcolor="white"
      padding={{ md: '20px 15px 20px' }}
      width="100%"
      maxWidth="400px"
    >
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit((data) => mutate(data))}
      >
        <Stack direction="column" width="100%" spacing="12px">
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h4" fontWeight="bold">
              Gửi lại mã xác thực
            </Typography>
          </Box>
          <FormControl>
            <TextField
              variant="outlined"
              color="primary"
              label="Email"
              fullWidth
              error={Boolean(errors.email)}
              helperText={errors.email?.message as any}
              {...register('email')}
            />
          </FormControl>
          <Box>
            <LoadingButton
              color="primary"
              variant="contained"
              fullWidth
              sx={{ fontSize: '16px' }}
              type="submit"
              loading={isLoading}
            >
              Xác nhận
            </LoadingButton>
          </Box>
          {errors.root?.message && (
            <FormHelperText error>{errors.root?.message}</FormHelperText>
          )}
          <Stack
            mt="12px"
            alignItems="center"
            justifyContent="space-between"
            direction="row"
            paddingX={{ md: '20px' }}
          >
            <Link href="/auth/reset-password">
              <Typography
                paragraph
                fontSize="14px"
                fontWeight={500}
                color="primary.main"
                sx={{ '&:hover': { textDecoration: 'underline' } }}
              >
                Quên mật khẩu
              </Typography>
            </Link>

            <Link href="/auth/verification/resend">
              <Typography
                paragraph
                fontSize="14px"
                fontWeight={500}
                color="primary.main"
                sx={{ '&:hover': { textDecoration: 'underline' } }}
              >
                Gửi lại mã xác thực
              </Typography>
            </Link>
          </Stack>
          <Box
            margin="20px 0"
            bgcolor="#dadde1"
            height="1px"
            width="100%"
          ></Box>
          <Stack justifyContent="center">
            <Box
              component="button"
              margin="auto"
              bgcolor="secondary.main"
              borderRadius="6px"
              padding="0 16px"
              height={{ md: '48px' }}
              sx={{ '&:hover': { bgcolor: 'secondary.dark' } }}
              lineHeight="48px"
              fontWeight="bold"
            >
              <Link href="/auth/register">
                <Box color="white" fontSize="17px">
                  Tạo tài khoản mới
                </Box>
              </Link>
            </Box>
          </Stack>
        </Stack>
      </FormProvider>
      <DevTool control={control} />
    </Box>
  );
};
