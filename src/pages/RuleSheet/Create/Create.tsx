import React from 'react';
import { Box } from '@material-ui/core';
import Style from './Style';

export const CreateRuleSheet = () => {
  const classes = Style();

  return <Box className={classes.root}>Create RuleSheet</Box>;
};
