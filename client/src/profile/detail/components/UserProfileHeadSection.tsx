import { Divider } from '@mui/material';
import { Box } from '@mui/system';
import { UserProfileCoverPhoto } from './UserProfileCoverPhoto';
import { UserProfileHeadTabs } from './UserProfileHeadTabs';
import { UserProfileTitle } from './UserProfileTitle';

export const UserProfileHeadSection = () => {
  return (
    <Box width="100%">
      <UserProfileCoverPhoto />
      <UserProfileTitle />
      <Divider />
      <UserProfileHeadTabs />
    </Box>
  );
};
