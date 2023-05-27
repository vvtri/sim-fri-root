import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';
import { Box, CircularProgress, Stack } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';

export const Header = () => {
  const { user, isLoading: isLoadingUser } = useAuth();

  return (
    <Stack
      position="sticky"
      bgcolor="#242526"
      top="0"
      left="0"
      borderBottom="1px solid #ffffff33"
      zIndex="10"
      height="65px"
    >
      <Stack
        width="100%"
        padding="10px 20px"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Link href="/">
          <Image
            src="/images/FullLogo_Transparent_NoBuffer.png"
            alt=""
            width="112"
            height="40"
          />
        </Link>
        <Stack
          width="220px"
          maxWidth="100%"
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexGrow="1"
          >
            <Link href="/">
              <HomeIcon color="primary" sx={{ fontSize: '45px' }} />
            </Link>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexGrow="1"
          >
            <Link href="/">
              <GroupIcon color="primary" sx={{ fontSize: '45px' }} />
            </Link>
          </Box>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing="10px"
          fontSize="40px"
        >
          <Link href="/" style={{ display: 'block' }}>
            <MessageIcon sx={{ color: 'white', fontSize: '40px' }} />
          </Link>
          <Link href="/">
            <CircleNotificationsIcon
              sx={{ color: 'white', fontSize: '40px' }}
            />
          </Link>
          <Box
            width={40}
            height={40}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {isLoadingUser ? (
              <CircularProgress color="primary" size={35} />
            ) : (
              <Link href="/profile/1">
                <Image
                  src="/images/blank-avatar.png"
                  alt=""
                  width="35"
                  height="35"
                  style={{ borderRadius: '50%' }}
                />
              </Link>
            )}
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};
