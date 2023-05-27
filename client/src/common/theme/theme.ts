import { createTheme } from '@mui/material';
import './theme.d';

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) =>
  augmentColor({ color: { main: mainColor } });

export const theme = createTheme({
  palette: {
    primary: createColor('#1877f2'),
    secondary: createColor('#2b9217'),
    secondaryText: createColor('#B0B3B8'),
    darkAccent: createColor('#242526'),
    secondaryButton: {
      ...createColor('rgba(255,255,255,.1)'),
      contrastText: 'white',
    },
    divider: '#3E4042',
    hoverColor: createColor('#4e4f50'),
    comment: createColor('#3A3B3C'),
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
    MuiSvgIcon: { styleOverrides: { root: { display: 'block' } } },
    MuiCard: {
      styleOverrides: { root: { backgroundColor: '#242526', color: 'white' } },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'inherit',
        },
      },
    },
    MuiTab: {
      styleOverrides: { root: { textTransform: 'inherit' } },
    },
  },
});
