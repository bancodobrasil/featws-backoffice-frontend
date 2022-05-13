import React, { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Style from './Style';
import {
  CreateRuleSheet,
  DeferRules,
  EditRuleSheet,
  ListRuleSheet,
  ShowRuleSheet,
} from '../../../pages/RuleSheet';
import RequireAuth from '../../Auth/RequireAuth';
import { NotificationProvider } from '../../../contexts/NotificationContext';

export const AppRoutes = () => {
  const classes = Style();

  /* TODO: Remove Auth testing code below */

  useEffect(() => {
    localStorage.setItem('auth-token', 'test');
    localStorage.setItem('auth-permissions', JSON.stringify(['user', 'admin']));
  }, []);

  return (
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
  );
};
