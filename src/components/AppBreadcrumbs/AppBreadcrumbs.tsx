import { Box, Breadcrumbs, IconButton, Link, Typography } from '@mui/material';
import React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export interface AppBreadcrumbsProps {
  items: { label: string; navigateTo?: string }[];
  onBack?: () => void;
}

const BreadcrumbsSeparator = ({ disabled = false }: { disabled?: boolean }): JSX.Element => (
  <Box
    component="span"
    sx={{
      color: disabled ? '#BFC3CA' : 'black',
      marginRight: '8px',
      marginLeft: '8px',
    }}
  >
    /
  </Box>
);

export const AppBreadcrumbs = ({ items, onBack }: AppBreadcrumbsProps): JSX.Element => {
  const navigate = useNavigate();
  const onBackClickHandler = () => {
    navigate('../');
  };
  const renderItems = () => {
    const disabledColor = '#BFC3CA';
    return items.map(({ label, navigateTo }, index) => {
      if (index === items.length - 1) {
        return (
          <div key={index}>
            <BreadcrumbsSeparator disabled />
            <Typography
              component="span"
              sx={{
                color: disabledColor,
              }}
            >
              {label}
            </Typography>
          </div>
        );
      }
      const labelComponent = navigateTo ? (
        <Link color="textPrimary" component={RouterLink} to={navigateTo}>
          {label}
        </Link>
      ) : (
        <Typography component="span" sx={{ color: disabledColor }}>
          {label}
        </Typography>
      );

      return (
        <div key={index}>
          {index !== 0 && <BreadcrumbsSeparator disabled={!navigateTo} />}
          {labelComponent}
        </div>
      );
    });
  };
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        left: '-5px',
        top: '-5px',
      }}
    >
      <IconButton onClick={onBack || onBackClickHandler} size="small">
        <ArrowBackIcon fontSize="small" color="primary" />
      </IconButton>

      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          marginLeft: '5px',
          color: '#000000',
          fontWeight: 300,
          fontSize: '14px',
          lineHeight: '24px',
          letterSpacing: '0.1px',
        }}
      >
        {renderItems()}
      </Breadcrumbs>
    </Box>
  );
};
