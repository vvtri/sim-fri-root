import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../redux/hook';
import {
  createPostSelector,
  setCreatePost,
} from '../../../redux/slices/post.slice';

export const UserProfilePostCreateSection = () => {
  const dispatch = useDispatch();
  const createPost = useAppSelector(createPostSelector);

  const handleSubmit = () => {
    dispatch(setCreatePost({ ...createPost, isShow: true }));
  };

  return (
    <Card>
      <Box sx={{ padding: '12px 14px' }}>
        <Stack direction="row" mb="10px">
          <Avatar src="/images/photo.jpg" sx={{ cursor: 'pointer' }} />
          <Button
            fullWidth
            sx={{
              backgroundColor: 'comment.main',
              height: '40px',
              padding: '8px 12px',
              borderRadius: '20px',
              ml: '8px',
              color: 'secondaryText.main',
              justifyContent: 'left',
              fontSize: '1.0625rem',
              '&:hover': { backgroundColor: 'comment.light' },
            }}
            onClick={() => handleSubmit()}
          >
            What's on your mind?
          </Button>
        </Stack>
        <Divider />
        <Stack
          direction="row"
          color="secondaryText.main"
          mt="12px"
          spacing="4px"
        >
          <Stack
            direction="row"
            flexGrow="1"
            justifyContent="center"
            alignItems="center"
            padding="8px"
            borderRadius="8px"
            sx={{
              transition: '.2s',
              cursor: 'pointer',
              '&:hover': { backgroundColor: '#4e4f50' },
            }}
            onClick={() => handleSubmit()}
          >
            <Image width={24} height={24} src="/images/video-icon.png" alt="" />
            <Typography ml="8px" fontWeight="600" fontSize="0.9375rem">
              Live video
            </Typography>
          </Stack>
          <Stack
            direction="row"
            flexGrow="1"
            justifyContent="center"
            alignItems="center"
            padding="8px"
            borderRadius="8px"
            sx={{
              transition: '.2s',
              cursor: 'pointer',
              '&:hover': { backgroundColor: '#4e4f50' },
            }}
            onClick={() => handleSubmit()}
          >
            <Image width={24} height={24} src="/images/photo-icon.png" alt="" />
            <Typography ml="8px" fontWeight="600" fontSize="0.9375rem">
              Photo/video
            </Typography>
          </Stack>{' '}
          <Stack
            direction="row"
            flexGrow="1"
            justifyContent="center"
            alignItems="center"
            padding="8px"
            borderRadius="8px"
            sx={{
              transition: '.2s',
              cursor: 'pointer',
              '&:hover': { backgroundColor: '#4e4f50' },
            }}
            onClick={() => handleSubmit()}
          >
            <Image width={24} height={24} src="/images/event-icon.png" alt="" />
            <Typography ml="8px" fontWeight="600" fontSize="0.9375rem">
              Life event
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
};
