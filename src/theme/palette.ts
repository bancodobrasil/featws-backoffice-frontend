/* eslint-disable import/no-anonymous-default-export */
import { colors } from '@mui/material';

const white = '#FFFFFF';
const black = '#000000';
const greySecondary = '#C2C2C2';

export default {
  black,
  white,
  primary: {
    contrastText: white,
    dark: '#403939',
    main: black,
    light: '#393434',
  },
  secondary: {
    contrastText: black,
    dark: '#A9A9A9',
    main: greySecondary,
    light: '#C2C2C2',
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400],
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400],
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400],
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  text: {
    primary: black,
    secondary: colors.blueGrey[600],
    link: colors.blue[600],
  },
  background: {
    default: white,
    paper: white,
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200],
};
