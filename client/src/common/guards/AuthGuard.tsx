import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';

type AuthGuardProps = {
  children: ReactNode;
};

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isLoading, user } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return <Box>Is loading user</Box>;
  }

  if (!isLoading && !user) {
    router.push('/auth/login');
    return <></>;
  }

  return <>{children}</>;
};
