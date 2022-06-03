import React, { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  CreateRuleSheet,
  DeferRules,
  ListRuleSheet,
  ShowRuleSheet,
} from '../../../pages/RuleSheet';
import RequireAuth from '../../Auth/RequireAuth';
import { NotificationProvider } from '../../../contexts/NotificationContext';
import { CancelRules } from '../../../pages/RuleSheet/Cancel';
import { CreateRule } from '../../../pages/Rule/Create';

export const AppRoutes = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<string>(i18n.resolvedLanguage);

  /* TODO: Remove Auth testing code below */
  useEffect(() => {
    localStorage.setItem('auth-token', 'test');
    localStorage.setItem('auth-permissions', JSON.stringify(['user', 'admin']));
  }, []);

  const handleLanguageChange = (event: SelectChangeEvent) => {
    const lng = event.target.value as string;
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  const renderLanguageSwitcher = () => (
    <Box sx={{ pt: '32px', display: 'flex', justifyContent: 'center' }}>
      <FormControl sx={{ minWidth: 160 }}>
        <InputLabel id="demo-simple-select-label">{t('language.title')}</InputLabel>
        <Select
          variant="standard"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={language}
          label={t('language.title')}
          onChange={handleLanguageChange}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="pt-BR">Português Brasileiro</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );

  return (
    <Box
      sx={{
        flex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
      }}
    >
      <Box
        sx={{
          width: '100%',
          flex: 1,
          boxSizing: 'border-box',
          paddingLeft: '32px',
          paddingRight: '32px',
        }}
      >
        {renderLanguageSwitcher()}
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
                  <Route
                    path="cancel"
                    element={
                      <RequireAuth permissions={['admin']}>
                        <CancelRules />
                      </RequireAuth>
                    }
                  />
                  <Route path="rules">
                    <Route
                      path="create"
                      element={
                        <RequireAuth permissions={['admin']}>
                          <CreateRule />
                        </RequireAuth>
                      }
                    />
                  </Route>
                </Route>
              </Route>
            </Routes>
          </NotificationProvider>
        </Router>
      </Box>
    </Box>
  );
};
