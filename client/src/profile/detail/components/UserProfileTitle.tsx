import AddIcon from '@mui/icons-material/Add';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, IconButton, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEventHandler } from 'react';
import { useDispatch } from 'react-redux';
import { emptyAvatarUrl } from '../../../common/constants/index.constant';
import { useAuth } from '../../../common/hooks/useAuth';
import {
  setEditProfile,
  setEditProfileModal,
} from '../../../redux/slices/profile.slice';

export const UserProfileTitle = () => {
  const { user } = useAuth();

  const dispatch = useDispatch();

  const handleUploadAvatar: ChangeEventHandler<HTMLInputElement> = async (
    e,
  ) => {
    const newImage = e.target.files?.[0];
    if (newImage) {
      dispatch(
        setEditProfile({
          isShowModal: true,
          avatar: { url: URL.createObjectURL(newImage), file: newImage },
        }),
      );
    }
  };

  return (
    <Stack marginTop="-30px">
      <Stack direction="row" padding="16px" justifyContent="space-between">
        <Stack direction="row">
          <Box mr="16px" position="relative">
            <Image
              src={user?.avatar?.url || emptyAvatarUrl}
              width={168}
              height={168}
              alt=""
              style={{ borderRadius: '50%', overflow: 'hidden' }}
            />

            <input
              hidden
              type="file"
              accept="image/*"
              id="test"
              onChange={handleUploadAvatar}
            />
            <label htmlFor="test">
              <IconButton
                component="span"
                sx={{
                  position: 'absolute',
                  bottom: '25px',
                  right: '25px',
                  transform: 'translate(50%, 50%)',
                  bgcolor: '#3A3B3C',
                  '&:hover': { bgcolor: '#3A3B3C' },
                }}
              >
                <CameraAltIcon style={{ color: 'white' }} />
              </IconButton>
            </label>
          </Box>
          <Stack margin="32px 0 16px" justifyContent="flex-end">
            <Box>
              <Typography fontSize="2rem" fontWeight="700" color="white">
                {user?.name}
              </Typography>
            </Box>
            <Box>
              <Link href="/profile/1">
                <Typography
                  variant="subtitle1"
                  color="secondaryText.main"
                  sx={{ '&:hover': { textDecorationLine: 'underline' } }}
                >
                  80 bạn
                </Typography>
              </Link>
            </Box>
            <Stack direction="row" spacing="-4px">
              <Box borderRadius="50%" overflow="hidden">
                <Image
                  src="/images/FullLogo_Transparent_NoBuffer.png"
                  width={32}
                  height={32}
                  alt=""
                />
              </Box>
              <Box borderRadius="50%" overflow="hidden">
                <Image
                  src="/images/FullLogo_Transparent_NoBuffer.png"
                  width={32}
                  height={32}
                  alt=""
                />
              </Box>
              <Box borderRadius="50%" overflow="hidden">
                <Image
                  src="/images/FullLogo_Transparent_NoBuffer.png"
                  width={32}
                  height={32}
                  alt=""
                />
              </Box>
            </Stack>
          </Stack>
        </Stack>

        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="end"
          spacing="10px"
          marginBottom="16px"
        >
          <Button variant="contained">
            <Stack direction="row" alignItems="center">
              <AddIcon />
              <Typography
                variant="body1"
                textTransform="none"
                fontSize="0.9375rem"
              >
                Add to story
              </Typography>
            </Stack>
          </Button>
          <Button
            variant="contained"
            color="secondaryButton"
            onClick={() => dispatch(setEditProfileModal(true))}
          >
            <Stack direction="row" alignItems="center">
              <AddIcon />
              <Typography
                variant="body1"
                textTransform="none"
                fontSize="0.9375rem"
              >
                Edit profile
              </Typography>
            </Stack>
          </Button>
          <Button
            variant="contained"
            color="secondaryButton"
            sx={{ paddingX: '0px' }}
          >
            <KeyboardArrowDownIcon fontSize="medium" />
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
