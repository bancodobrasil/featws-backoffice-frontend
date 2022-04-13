import { createTheme } from '@material-ui/core';

import palette from './palette';
import bbTypography from './bbTypography';

const theme = createTheme({
  palette,
  typography: bbTypography,
});

export default theme;
