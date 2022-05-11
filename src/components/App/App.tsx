import React, { useEffect } from 'react';
import { ThemeProvider, CssBaseline, Box, Container } from '@material-ui/core';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import theme from '../../theme';
import Style from './Style';
import {
  CreateRuleSheet,
  DeferRules,
  EditRuleSheet,
  ListRuleSheet,
  ShowRuleSheet,
} from '../../pages/RuleSheet';
import RequireAuth from '../Auth/RequireAuth';
import './AppStyles.css';
import { NotificationProvider } from '../../contexts/NotificationContext';

// INFO Mude a seed de acordo com o nome do seu projeto!
const generateClassName = createGenerateClassName({
  seed: 'featws-ui',
});

const App = () => {
  const classes = Style();

  /* TODO: Remove Auth testing code below */

  useEffect(() => {
    localStorage.setItem('auth-token', 'test');
    localStorage.setItem('auth-permissions', JSON.stringify(['user', 'admin']));
  }, []);

  return (
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box className={classes.base}>
          <Container maxWidth="xl" className={classes.main} disableGutters>
            <Box className={classes.mainContent}>
              <Router>
                <NotificationProvider>
                  <Routes>
                    <Route index element={<Navigate to="/rulesheets" replace />} />
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
                      <Route path=":id">
                        <Route
                          index
                          element={
                            <RequireAuth>
                              <ShowRuleSheet />
                            </RequireAuth>
                          }
                        />
                        <Route
                          path="defer"
                          element={
                            <RequireAuth permissions={['admin']}>
                              <DeferRules />
                            </RequireAuth>
                          }
                        />
                      </Route>
                    </Route>
                  </Routes>
                </NotificationProvider>
              </Router>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default App;
