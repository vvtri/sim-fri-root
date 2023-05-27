import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Box,
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
import {
  saveAccessToken,
  saveRefreshToken,
} from '../../../common/utils/auth.util';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { fetchUserThunk } from '../../../redux/slices/auth.slice';
import { verifyUserEmailSelector } from '../../../redux/slices/verify-user.slice';
import { useVerifyUser } from '../hooks/useVerifyUser';
import {
  IVerifyUserSchemaForm,
  verifyUserSchema,
} from '../schemas/verify.schema';

export const VerifyUserForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const email = useAppSelector(verifyUserEmailSelector);

  const methods = useForm<IVerifyUserSchemaForm>({
    resolver: yupResolver(verifyUserSchema),
  });
  const { register, control, formState, handleSubmit, setError, getValues } =
    methods;
  const { errors } = formState;
  const { isLoading, mutate } = useVerifyUser({
    onSuccess(data, variables, context) {
      saveAccessToken(data.accessToken);
      saveRefreshToken(data.refreshToken);
      dispatch(fetchUserThunk());
      // router.push('/');
    },
    onError(error, variables, context) {
      let msg = DEFAULT_MESSAGE;
      if (axios.isAxiosError(error)) {
        const res = error.response?.data as IApiError;
        switch (res.statusCode) {
          case AuthStatusCode.INVALID_USER_TOKEN:
            msg = 'Mã xác thực không hợp lệ';
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
        onSubmit={handleSubmit((data) => mutate({ email, code: data.code }))}
      >
        <Stack direction="column" width="100%" spacing="12px">
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h4" fontWeight="bold">
              Xác thực email
            </Typography>
          </Box>
          <TextField
            variant="outlined"
            color="primary"
            label="Mã xác thực"
            fullWidth
            error={Boolean(errors.code)}
            helperText={errors.code?.message as any}
            {...register('code')}
          />
          <FormHelperText>
            Chúng tôi đã gửi mã xác thực đến email {email}, hãy chờ trong vài
            phút.
          </FormHelperText>
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
