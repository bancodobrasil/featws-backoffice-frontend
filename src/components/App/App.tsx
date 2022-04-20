import React from 'react';
import { ThemeProvider, CssBaseline, Box, Container } from '@material-ui/core';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from '../../theme';
import Style from './Style';
import { Main } from '../../pages/Main';
import {
  CreateRuleSheet,
  EditRuleSheet,
  ListRuleSheet,
  ShowRuleSheet,
} from '../../pages/RuleSheet';

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
              <Router>
                <Routes>
                  <Route index element={<Main />} />
                  <Route path="rulesheets">
                    <Route index element={<ListRuleSheet />} />
                    <Route path="create" element={<CreateRuleSheet />} />
                    <Route path=":id" element={<ShowRuleSheet />} />
                    <Route path="edit/:id" element={<EditRuleSheet />} />
                  </Route>
                </Routes>
              </Router>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default App;
