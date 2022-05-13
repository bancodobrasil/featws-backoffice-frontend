import React from 'react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
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
