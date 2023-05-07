import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup
    .string()
    .required('Vui lòng nhập email')
    .email('Vui lòng nhập email hợp lệ'),
  password: yup.string().required('Vui lòng nhập mật khẩu'),
});

export interface ILoginForm extends yup.InferType<typeof loginSchema> {}
