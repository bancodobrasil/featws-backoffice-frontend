import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import Style from './Style';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

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
  let navigate = useNavigate();

  const classes = Style();

  const handleButtonCreateOnClick = () => {
    navigate('create');
  };

  return (
    <Box className={classes.root}>
      <div className={classes.headingContainer}>
        <h1>Rule Sheets</h1>
        <div className={classes.headingButtonsContainer}>
          <Button variant="contained" color="primary" onClick={handleButtonCreateOnClick}>
            Create Rule Sheet
          </Button>
        </div>
      </div>
      <DataGrid
        className={classes.dataGrid}
        rows={rows}
        columns={columns}
        pageSize={10}
        autoHeight
      />
    </Box>
  );
};
