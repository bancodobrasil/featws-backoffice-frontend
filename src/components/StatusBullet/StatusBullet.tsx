import { Box } from '@mui/material';
import React from 'react';
import { RuleStatusEnum } from '../../types';

export const StatusBullet = ({ status }: { status: string }) => {
  let color;
  switch (status) {
    case RuleStatusEnum.DEFERRED:
      color = '#16C559';
      break;
    case RuleStatusEnum.AWAITING:
      color = '#07B4F2';
      break;
    case RuleStatusEnum.DRAFT:
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
