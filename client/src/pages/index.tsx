import { Box } from '@mui/material';
import { AuthGuard } from '../common/guards/AuthGuard';

export default function Home() {
  return (
    <AuthGuard>
      <Box>go into auth guard</Box>;
    </AuthGuard>
  );
}
