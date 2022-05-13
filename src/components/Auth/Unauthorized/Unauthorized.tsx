import { Box, Typography } from '@mui/material';
import React from 'react';

export const Unauthorized = () => (
  <Box
    sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      py: '16px',
    }}
  >
    <Typography variant="h1" component="p">
      Unauthorized
    </Typography>
  </Box>
);
