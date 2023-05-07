import { Box, GlobalStyles } from '@mui/material';
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
            '-webkit-box-shadow': '0 0 0 30px white inset !important',
          },
          'input:-webkit-autofill:hover': {
            '-webkit-box-shadow': '0 0 0 30px white inset !important',
          },
          'input:-webkit-autofill:focus': {
            '-webkit-box-shadow': '0 0 0 30px white inset !important',
          },
          'input:-webkit-autofill:activ': {
            '-webkit-box-shadow': '0 0 0 30px white inset !important',
          },
          a: { textDecoration: 'none' },
          'input::-ms-reveal': { display: 'none' },
        }}
      />
      {children}
    </Box>
  );
};
