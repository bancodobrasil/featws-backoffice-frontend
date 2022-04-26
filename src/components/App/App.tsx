import React, { useEffect } from 'react';
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
import { isAuthenticated } from '../../providers/Auth';
import RequireAuth from '../Auth/RequireAuth';

// INFO Mude a seed de acordo com o nome do seu projeto!
const generateClassName = createGenerateClassName({
  seed: 'featws-ui',
});

const App = () => {
  const classes = Style();

  /* TODO: Remove Auth testing code below */

  useEffect(() => {
    localStorage.setItem('auth-token', 'test');
    localStorage.setItem('auth-permissions', JSON.stringify(['user']));
  }, []);

  const renderAuthInfo = () => {
    return (
      <div>
        <p>Is Authenticated: {isAuthenticated() ? 'true' : 'false'}</p>
        <p>Permissions: {localStorage.getItem('auth-permissions')}</p>
      </div>
    );
  };

  return (
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box className={classes.base}>
          <Container maxWidth="xl" className={classes.main} disableGutters>
            <Box className={classes.mainContent}>
              {renderAuthInfo()}
              <Router>
                <Routes>
                  <Route index element={<Main />} />
                  <Route path="rulesheets">
                    <Route
                      index
                      element={
                        <RequireAuth>
                          <ListRuleSheet />
                        </RequireAuth>
                      }
                    />
                    <Route
                      path="create"
                      element={
                        <RequireAuth permissions={['admin']}>
                          <CreateRuleSheet />
                        </RequireAuth>
                      }
                    />
                    <Route
                      path="edit/:id"
                      element={
                        <RequireAuth permissions={['admin']}>
                          <EditRuleSheet />
                        </RequireAuth>
                      }
                    />
                    <Route
                      path=":id"
                      element={
                        <RequireAuth>
                          <ShowRuleSheet />
                        </RequireAuth>
                      }
                    />
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
