import React, { useEffect } from 'react';
import { Box, Divider } from '@material-ui/core';
import Style from './Style';
import { Link } from 'react-router-dom';

export const Main = () => {
  useEffect(() => {}, []);

  const classes = Style();

  return (
    <Box className={classes.root}>
      <h1 className={classes.title}>FeatWS - Home</h1>
      <Divider />
      <h2>Pages:</h2>
      <ul>
        <li>
          <Link to="rulesheets">Rule Sheets</Link>
        </li>
      </ul>
    </Box>
  );
};
