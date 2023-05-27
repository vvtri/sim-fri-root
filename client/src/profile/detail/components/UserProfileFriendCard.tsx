import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useAuth } from '../../../common/hooks/useAuth';

export const UserProfileFriendCard = () => {
  const { user } = useAuth();

  return (
    <Card>
      <CardHeader
        title="Friends"
        titleTypographyProps={{ fontSize: '1.25rem', fontWeight: 700 }}
        subheader={`70 friends`}
        subheaderTypographyProps={{
          fontSize: '1.0625rem',
          color: '#B0B3B8',
        }}
        action={
          <Button sx={{ textTransform: 'none', fontSize: '1rem' }}>
            See all friends
          </Button>
        }
      />
      <CardContent>
        <Box width="33.33%">
          <Box
            position="relative"
            padding="0 0 100% 0"
            borderRadius="8px"
            overflow="hidden"
          >
            <Image fill src={'/images/photo.jpg'} alt="" />
          </Box>
          <Typography
            mt="8px"
            fontWeight="600"
            fontSize="0.8125rem"
            color="secondaryText.main"
          >
            Võ Quang Vinh
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
