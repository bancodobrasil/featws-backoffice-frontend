import React from 'react';
import { Box, Typography } from '@material-ui/core';
import Style from './Style';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 90,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
  },
];

const rows = [
  { id: 1, name: 'apw' },
  { id: 2, name: 'test' },
];

export const ListRuleSheet = () => {
  const classes = Style();

  return (
    <Box className={classes.root}>
      <h1>Rule Sheets</h1>
      <DataGrid
        className={classes.dataGrid}
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </Box>
  );
};
