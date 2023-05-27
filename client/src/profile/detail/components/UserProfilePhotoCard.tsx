import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import Image from 'next/image';

export const UserProfilePhotoCard = () => {
  return (
    <Card>
      <CardHeader
        title="Photos"
        titleTypographyProps={{ fontSize: '1.25rem', fontWeight: 700 }}
        action={
          <Button sx={{ textTransform: 'none', fontSize: '1rem' }}>
            See all Photos
          </Button>
        }
      />
      <CardContent>
        <Box width="33.33%">
          <Box position="relative" padding="0 0 100% 0" borderRadius="8px" overflow='hidden'>
            <Image fill src='/images/photo.jpg' alt="" />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
