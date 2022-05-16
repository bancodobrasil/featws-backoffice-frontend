import { Box } from '@mui/material';
import React from 'react';

export const StatusBullet = ({ status }: { status: string }) => {
  let color;
  switch (status) {
    case 'Deferida':
      color = '#16C559';
      break;
    case 'Aguardando deferimento':
      color = '#07B4F2';
      break;
    case 'Rascunho':
      color = '#F97A70';
      break;
  }
  return (
    <Box
      sx={{
        width: 8,
        height: 8,
        borderRadius: 999,
        marginLeft: '16px',
        backgroundColor: color,
      }}
    />
  );
};
