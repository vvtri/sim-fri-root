import { Box, Button } from '@mui/material';
import { AuthGuard } from '../common/guards/AuthGuard';
import { deleteAccessToken } from '../common/utils/auth.util';
import { useAppDispatch } from '../redux/hook';
import { setAuth } from '../redux/slices/auth.slice';

export default function Home() {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    deleteAccessToken();
    dispatch(setAuth({ user: null, isLoading: false }));
  };

  return (
    <AuthGuard>
      <Box>go into auth guard</Box>
      <Button onClick={() => handleLogout()}>Logout</Button>
    </AuthGuard>
  );
}
