import React from 'react';
import { ThemeProvider, CssBaseline, Box, Container } from '@material-ui/core';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import theme from '../../theme';
import Main from '../Main';

import Style from './Style';

// INFO Mude a seed de acordo com o nome do seu projeto!
const generateClassName = createGenerateClassName({
  seed: 'featws-ui',
});

const App = () => {
  const classes = Style();

  return (
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box className={classes.base}>
          <Container maxWidth="xl" className={classes.main} disableGutters>
            <Box className={classes.mainContent}>
              <Main />
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default App;
