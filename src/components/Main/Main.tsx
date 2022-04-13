import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import Style from './Style';

const Main = () => {
  useEffect(() => {}, []);

  const classes = Style();

  return <Box className={classes.root}>Hello World!</Box>;
};

export default Main;
