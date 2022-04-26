import React from 'react';
import { Box, Button, IconButton, Paper } from '@material-ui/core';
import Style from './Style';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/VisibilityOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import AuthorizedComponent from '../../../components/Auth/AuthorizedComponent';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    minWidth: 90,
  },
  {
    field: 'name',
    headerName: 'Name',
    minWidth: 150,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    minWidth: 150,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: params => {
      const navigate = useNavigate();

      return (
        <div>
          {/* Show Button */}
          <IconButton
            onClick={() => {
              navigate(params.id.toString());
            }}
          >
            <VisibilityIcon color="primary" fontSize="small" />
          </IconButton>

          {/* Edit Button */}
          <AuthorizedComponent permissions={['admin']}>
            <IconButton
              onClick={() => {
                navigate(`edit/${params.id}`);
              }}
            >
              <EditIcon color="primary" fontSize="small" />
            </IconButton>
          </AuthorizedComponent>

          {/* Delete Button */}
          <AuthorizedComponent permissions={['admin']}>
            <IconButton
              onClick={() => {
                confirm('Confirm delete Rule Sheet?');
              }}
            >
              <DeleteIcon color="error" fontSize="small" />
            </IconButton>
          </AuthorizedComponent>
        </div>
      );
    },
  },
];

const rows = [
  { id: 1, name: 'apw' },
  { id: 2, name: 'test' },
];

export const ListRuleSheet = () => {
  const navigate = useNavigate();

  const classes = Style();

  const handleButtonCreateOnClick = () => {
    navigate('create');
  };

  return (
    <Box className={classes.root}>
      <div className={classes.headingContainer}>
        <h1>Rule Sheets</h1>
        <div className={classes.headingButtonsContainer}>
          <AuthorizedComponent permissions={["admin"]}>
            <Button variant="contained" color="primary" onClick={handleButtonCreateOnClick}>
              Create Rule Sheet
            </Button>
          </AuthorizedComponent>
        </div>
      </div>
      <Paper className={classes.dataGridContainer} elevation={0}>
        <DataGrid
          className={classes.dataGrid}
          rows={rows}
          columns={columns}
          pageSize={10}
          autoHeight
          disableSelectionOnClick
        />
      </Paper>
    </Box>
  );
};
