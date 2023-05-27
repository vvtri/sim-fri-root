import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';

export const PostCard = () => {
  return (
    <Box bgcolor="darkAccent.main" borderRadius="6px" paddingX="16px">
      <Stack
        direction="row"
        paddingY="12px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack direction="row">
          <Avatar src="/images/blank-avatar.png" />
          <Stack ml="8px">
            <Typography
              fontSize="0.9375rem"
              sx={{ '&:hover': { textDecorationLine: 'underline' } }}
            >
              Trí
            </Typography>

            <Stack direction="row" alignItems="center" spacing="4px">
              <Typography
                color="secondaryText.main"
                fontSize=".8125rem"
                sx={{ '&:hover': { textDecorationLine: 'underline' } }}
              >
                29 January
              </Typography>
              <Typography color="secondaryText.main" fontSize="1rem" my="4px">
                &#183;
              </Typography>
              <Image
                src="/images/audience-type.png"
                width={12}
                height={12}
                alt=""
                style={{
                  WebkitFilter:
                    'invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)',
                }}
              />
            </Stack>
          </Stack>
        </Stack>

        <IconButton color="secondaryText">
          <MoreHorizIcon />
        </IconButton>
      </Stack>

      <Box fontSize="1.5rem">asad</Box>

      <Divider />

      <Stack direction="row" my="4px">
        <Button
          color="secondaryText"
          startIcon={<ThumbUpOffAltIcon />}
          sx={{ flexGrow: '1', fontSize: '.9375rem', fontWeight: '600' }}
        >
          Like
        </Button>
        <Button
          color="secondaryText"
          startIcon={<ChatBubbleOutlineIcon />}
          sx={{ flexGrow: '1', fontSize: '.9375rem', fontWeight: '600' }}
        >
          Comment
        </Button>
        <Button
          color="secondaryText"
          startIcon={<ShareIcon />}
          sx={{ flexGrow: '1', fontSize: '.9375rem', fontWeight: '600' }}
        >
          Share
        </Button>
      </Stack>

      <Divider />
    </Box>
  );
};
