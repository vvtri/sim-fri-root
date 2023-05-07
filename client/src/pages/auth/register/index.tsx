import router from 'next/router';
import { ReactElement, useEffect } from 'react';
import { RegisterForm } from '../../../auth/register/components/RegisterForm';
import { useAuth } from '../../../common/hooks/useAuth';
import AuthLayout from '../../../common/layouts/AuthLayout';

export default function Register() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) router.push('/');
  }, [user]);

  return <RegisterForm />;
}

Register.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>;
};
