import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { ReactNode } from 'react';

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Stack
      width={{ sm: '100vw' }}
      height={{ sm: '100vh' }}
      direction={{ xs: 'column', md: 'row' }}
      alignItems={{ md: 'center' }}
      justifyContent={{ md: 'center' }}
      bgcolor="#f0f2f5"
    >
      <Stack
        mb="5"
        direction="column"
        width="100%"
        maxWidth={600}
        paddingRight="32px"
      >
        <Box padding="0 0 16px" width="100%">
          <Image
            src="/images/FullLogo_Transparent_NoBuffer.png"
            alt="logo"
            width={256}
            height={90}
          />
        </Box>
        <Typography fontSize={28} lineHeight="32px" width="100%" maxWidth={500}>
          SimFri helps you connect and share with the people in your life.
        </Typography>
      </Stack>

      {children}
    </Stack>
  );
}
