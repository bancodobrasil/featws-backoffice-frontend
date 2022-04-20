import React from 'react';
import { Box } from '@material-ui/core';
import Style from './Style';

export const ListRuleSheet = () => {
  const classes = Style();

  return <Box className={classes.root}>RuleSheet</Box>;
};
