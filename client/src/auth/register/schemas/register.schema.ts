import * as yup from 'yup';

export const registerSchema = yup.object({
  email: yup
    .string()
    .required('Vui lòng nhập email')
    .email('Vui lòng nhập email hợp lệ'),
  password: yup.string().required('Vui lòng nhập mật khẩu'),
  rePassword: yup
    .string()
    .required('Vui lòng nhập lại mật khẩu')
    .oneOf([yup.ref('password'), ''], 'Mật khẩu không trùng khớp'),
});

export interface IRegisterForm extends yup.InferType<typeof registerSchema> {}
