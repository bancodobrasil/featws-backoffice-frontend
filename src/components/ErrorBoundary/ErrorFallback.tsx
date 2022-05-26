import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const ErrorFallback = ({ message }: { message?: string }): JSX.Element => {
  const { t } = useTranslation();

  message = message || t('common.error.default');

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Typography
        component="p"
        variant="h4"
        sx={{
          color: 'error.main',
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};
