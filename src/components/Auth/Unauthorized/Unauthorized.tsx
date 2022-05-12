import { Typography } from '@material-ui/core';
import React from 'react';
import Style from './Style';

export const Unauthorized = () => {
  const classes = Style();

  return (
    <div className={classes.root}>
      <Typography variant="h1" component="p">
        Unauthorized
      </Typography>
    </div>
  );
};
