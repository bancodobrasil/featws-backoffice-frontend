import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { StylesProvider, createGenerateClassName } from '@mui/styles';
import theme from '../../theme';
import './AppStyles.css';
import { AppRoutes } from './AppRoutes';

// INFO Mude a seed de acordo com o nome do seu projeto!
const generateClassName = createGenerateClassName({
  seed: 'featws-ui',
});

const App = () => (
  <StylesProvider generateClassName={generateClassName}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  </StylesProvider>
);

export default App;
