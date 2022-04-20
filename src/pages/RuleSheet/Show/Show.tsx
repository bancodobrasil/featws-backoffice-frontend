import React from 'react';
import { Box } from '@material-ui/core';
import Style from './Style';

export const ShowRuleSheet = () => {
  const classes = Style();

  return <Box className={classes.root}>Show RuleSheet</Box>;
};
