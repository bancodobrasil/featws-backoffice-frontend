import React from 'react';
import { Box } from '@material-ui/core';
import Style from './Style';

export const EditRuleSheet = () => {
  const classes = Style();

  return <Box className={classes.root}>Edit RuleSheet</Box>;
};
