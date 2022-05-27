import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AppBreadcrumbs, AppBreadcrumbsProps } from '../AppBreadcrumbs';

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

export const ErrorFallbackWithBreadcrumbs = ({
  message,
  appBreadcrumbsProps,
}: {
  message?: string;
  appBreadcrumbsProps: AppBreadcrumbsProps;
}): JSX.Element => {
  const { t } = useTranslation();

  message = message || t('common.error.default');

  return (
    <Box
      sx={{
        width: '100%',
        paddingTop: '34px',
        paddingBottom: '34px',
      }}
    >
      <AppBreadcrumbs {...appBreadcrumbsProps} />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '11px',
        }}
      >
        <ErrorFallback message={message} />
      </Box>
    </Box>
  );
};
