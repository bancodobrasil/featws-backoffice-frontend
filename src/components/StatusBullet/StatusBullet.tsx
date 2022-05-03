import React from 'react';
import Style from './Style';

export const StatusBullet = ({ status }: { status: string }) => {
  const classes = Style();
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
    <div
      className={classes.bullet}
      style={{
        backgroundColor: color,
      }}
    />
  );
};
