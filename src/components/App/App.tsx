import React, { Suspense } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from '../../theme';
import './AppStyles.css';
import { AppRoutes } from './AppRoutes';
import i18n from '../../i18n';
import Loading from '../Loading';

const App = () => (
  <Suspense fallback={<Loading />}>
    <ThemeProvider theme={theme(i18n.language)}>
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  </Suspense>
);

export default App;
