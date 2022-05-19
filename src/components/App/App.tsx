import React, { Suspense } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from '../../theme';
import './AppStyles.css';
import { AppRoutes } from './AppRoutes';
import '../../i18n';
import Loading from '../Loading';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Suspense fallback={<Loading />}>
      <AppRoutes />
    </Suspense>
  </ThemeProvider>
);

export default App;
