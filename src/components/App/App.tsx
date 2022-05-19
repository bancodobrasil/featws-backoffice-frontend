import React, { Suspense } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline, Typography } from '@mui/material';
import theme from '../../theme';
import './AppStyles.css';
import { AppRoutes } from './AppRoutes';
import '../../i18n';

const Loader = () => (
  <Box
    sx={{
      marginTop: '24px',
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <Typography variant="h2" component="p">
      Carregando...
    </Typography>
  </Box>
);

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Suspense fallback={<Loader />}>
      <AppRoutes />
    </Suspense>
  </ThemeProvider>
);

export default App;
