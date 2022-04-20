import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import Style from './Style';

export const Main = () => {
  useEffect(() => {}, []);

  const classes = Style();

  return <Box className={classes.root}>Hello World!</Box>;
};
