import { Box, GlobalStyles } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SnackbarProvider } from 'notistack';
import { useEffect } from 'react';
import { useAppDispatch } from '../../redux/hook';
import { fetchUserThunk } from '../../redux/slices/auth.slice';

export const AppWrapper = ({ children }: { children: any }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserThunk());
  }, []);

  return (
    <Box fontFamily="Helvetica, Arial, sans-serif">
      <GlobalStyles
        styles={{
          'input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 30px white inset !important',
          },
          'input:-webkit-autofill:hover': {
            WebkitBoxShadow: '0 0 0 30px white inset !important',
          },
          'input:-webkit-autofill:focus': {
            WebkitBoxShadow: '0 0 0 30px white inset !important',
          },
          'input:-webkit-autofill:activ': {
            WebkitBoxShadow: '0 0 0 30px white inset !important',
          },
          'a, a:hover': { textDecoration: 'none', color: 'inherit' },
          'input::-ms-reveal': { display: 'none' },
          img: { display: 'block' },
        }}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <SnackbarProvider
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          maxSnack={3}
        >
          {children}
        </SnackbarProvider>
      </LocalizationProvider>
    </Box>
  );
};
