import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  FormControl,
  FormHelperText,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RHFPassword } from '../../../common/components/RHFPassword';
import { DEFAULT_MESSAGE } from '../../../common/constants/index.constant';
import { IApiError } from '../../../common/interfaces/api-error.interface';
import { AuthStatusCode } from '../../../common/status-code/auth.status-code';
import {
  saveAccessToken,
  saveRefreshToken,
} from '../../../common/utils/index.util';
import { useAppDispatch } from '../../../redux/hook';
import { fetchUserThunk } from '../../../redux/slices/auth.slice';
import {
  setVerifyUserEmail,
  setVerifyUserStep,
} from '../../../redux/slices/verify-user.slice';
import { useLogin } from '../hooks/useLogin';
import { ILoginForm, loginSchema } from '../schemas/login.schema';

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isShowVerifyModal, setIsShowVerifyModal] = useState(false);

  const { register, control, formState, handleSubmit, setError, getValues } =
    useForm<ILoginForm>({
      resolver: yupResolver(loginSchema),
    });
  const { errors } = formState;

  const { mutate, isLoading } = useLogin({
    onSuccess(data, variables, context) {
      if (data.isVerified) {
        saveAccessToken(data.accessToken);
        saveRefreshToken(data.refreshToken);
        dispatch(fetchUserThunk());
        router.push('/');
      } else {
        setIsShowVerifyModal(true);
      }
    },
    onError(error, variables, context) {
      let msg = DEFAULT_MESSAGE;
      if (axios.isAxiosError(error)) {
        const res = error.response?.data as IApiError;
        switch (res.statusCode) {
          case AuthStatusCode.USER_NOT_FOUND:
            msg = 'Tài khoản không tồn tại';
            break;
          case AuthStatusCode.INVALID_PASSWORD:
            msg = 'Mật khẩu không đúng';
            break;
          case AuthStatusCode.USER_NOT_VERIFIED:
            msg = 'Tài khoản chưa được xác thực';
            break;
        }
      }
      setError('root', { message: msg });
    },
  });

  const goToVerification = () => {
    dispatch(setVerifyUserEmail(getValues().email));
    dispatch(setVerifyUserStep('CODE'));
    router.push('/auth/verification');
  };

  return (
    <>
      <Stack
        component="form"
        direction="column"
        bgcolor="white"
        width="100%"
        padding={{ md: '20px 15px 20px' }}
        maxWidth="400px"
        noValidate
        onSubmit={handleSubmit((data) => mutate(data))}
        spacing="12px"
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography variant="h4" fontWeight="bold">
            Đăng nhập
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
        <RHFPassword
          error={Boolean(errors.password)}
          helperText={errors.password?.message as any}
          register={register('password')}
        />
        <Box>
          <LoadingButton
            color="primary"
            variant="contained"
            fullWidth
            sx={{ fontSize: '16px' }}
            type="submit"
            loading={isLoading}
          >
            Đăng nhập
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
        <Box margin="20px 0" bgcolor="#dadde1" height="1px" width="100%"></Box>
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
      <DevTool control={control} />
      <Modal
        open={isShowVerifyModal}
        onClose={() => setIsShowVerifyModal(false)}
      >
        <Box
          position="absolute"
          top="50%"
          left="50%"
          sx={{ transform: 'translate(-50%, -50%)' }}
          bgcolor="white"
          padding="20px"
        >
          <Stack direction="row">
            <Typography paragraph variant="body1" mb="0">
              Email {getValues().email} chưa được xác thực!
            </Typography>
            <Typography
              paragraph
              variant="body1"
              color="primary"
              sx={{ cursor: 'pointer' }}
              ml="4px"
              mb="0"
              onClick={() => goToVerification()}
            >
              Xác thực ngay
            </Typography>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};
