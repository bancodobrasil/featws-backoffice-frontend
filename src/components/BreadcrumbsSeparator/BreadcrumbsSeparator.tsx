import { Box } from '@mui/material';
import React from 'react';

export const BreadcrumbsSeparator = ({ last = true }: { last?: boolean }): JSX.Element => (
  <Box
    component="span"
    sx={{
      color: last ? '#BFC3CA' : 'black',
      marginRight: '8px',
      marginLeft: '8px',
    }}
  >
    /
  </Box>
);
