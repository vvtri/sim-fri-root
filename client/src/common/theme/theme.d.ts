import type { Palette } from '@mui/material';

type Temp = Palette; // for import not removed

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    darkAccent: Palette['primary'];
    secondaryButton: Palette['primary'];
    hoverOverlay: Palette['primary'];
    secondaryText: Palette['primary'];
    comment: Palette['primary'];
  }
  interface PaletteOptions {
    darkAccent?: PaletteOptions['primary'];
    secondaryButton?: PaletteOptions['primary'];
    hoverColor?: PaletteOptions['primary'];
    secondaryText: Palette['primary'];
    comment: Palette['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    darkAccent: true;
    secondaryButton: true;
    hoverOverlay: true;
    comment: true;
    secondaryText: true;
  }
}
declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    darkAccent: true;
    secondaryButton: true;
    hoverOverlay: true;
    comment: true;
    secondaryText: true;
  }
}
declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsColorOverrides {
    darkAccent: true;
    secondaryButton: true;
    hoverOverlay: true;
    comment: true;
    secondaryText: true;
  }
}
declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides {
    darkAccent: true;
    secondaryButton: true;
    hoverOverlay: true;
    comment: true;
    secondaryText: true;
  }
}
