import { createTheme } from '@mui/material';

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) =>
  augmentColor({ color: { main: mainColor } });
export const theme = createTheme({
  palette: {
    primary: createColor('#1877f2'),
    secondary: createColor('#2b9217'),
  },
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: { fontSize: '14px' },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: { margin: 0 },
      },
    },
  },
});
