import { Button, Card, CardContent, CardHeader, Stack } from '@mui/material';

export const UserProfileIntroCard = () => {
  return (
    <Card>
      <CardHeader
        title="Intro"
        titleTypographyProps={{ fontSize: '1.25rem', fontWeight: 700 }}
      />
      <CardContent>
        <Stack spacing="18px">
          <Button
            variant="contained"
            color="secondaryButton"
            fullWidth
            sx={{ textTransform: 'none' }}
          >
            Add Bio
          </Button>
          <Button
            variant="contained"
            color="secondaryButton"
            fullWidth
            sx={{ textTransform: 'none' }}
          >
            Edit details
          </Button>
          <Button
            variant="contained"
            color="secondaryButton"
            fullWidth
            sx={{ textTransform: 'none' }}
          >
            Add Hobbies
          </Button>
          <Button
            variant="contained"
            color="secondaryButton"
            fullWidth
            sx={{ textTransform: 'none' }}
          >
            Add Featured
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
