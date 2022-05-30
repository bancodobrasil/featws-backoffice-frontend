import { PaletteColor } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    link: PaletteColor;
  }
  interface PaletteOptions {
    link: PaletteColor;
  }
}
