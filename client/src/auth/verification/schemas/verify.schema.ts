import * as yup from 'yup';

export const resendVerificationSchema = yup.object({
  email: yup
    .string()
    .required('Vui lòng nhập email')
    .email('Vui lòng nhập email hợp lệ'),
});

export interface IResendVerificationForm
  extends yup.InferType<typeof resendVerificationSchema> {}

export const verifyUserSchema = yup.object({
  code: yup.string().required('Vui lòng nhập mã xác thực'),
});

export interface IVerifyUserSchemaForm
  extends yup.InferType<typeof verifyUserSchema> {}
