import router from 'next/router';
import { ReactElement, useEffect } from 'react';
import { LoginForm } from '../../../auth/login/components/LoginForm';
import { useAuth } from '../../../common/hooks/useAuth';
import AuthLayout from '../../../common/layouts/AuthLayout';

export default function Login() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) router.push('/');
  }, [user]);

  return <LoginForm />;
}

Login.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>;
};
