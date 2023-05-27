import { Box } from '@mui/material';
import { UserProfileEditDialog } from '../../profile/detail/components/UserProfileEditDialog';
import { UserProfileHeadSection } from '../../profile/detail/components/UserProfileHeadSection';
import { Header } from '../components/Header';
import { AuthGuard } from '../guards/AuthGuard';
import { PropsWithChildren } from '../types/util.type';

type ProfileLayoutProps = PropsWithChildren;

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <AuthGuard>
      <UserProfileEditDialog />

      <Box width="100%" bgcolor="black" color="white">
        <Header />
        <Box width="100%">
          <Box bgcolor="darkAccent.main">
            <Box width="100%" maxWidth="940px" margin="auto">
              <UserProfileHeadSection />
            </Box>
          </Box>

          <Box width="100%" maxWidth="940px" margin="auto">
            {children}
          </Box>
        </Box>
      </Box>
    </AuthGuard>
  );
}
