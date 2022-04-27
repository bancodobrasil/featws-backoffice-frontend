import React from 'react';
import { Box, Button, IconButton, Paper } from '@material-ui/core';
import Style from './Style';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import AuthorizedComponent from '../../../components/Auth/AuthorizedComponent';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'NOME DA FOLHA',
    minWidth: 300,
  },
  {
    field: 'responsible',
    headerName: 'RESPONSÁVEL',
    minWidth: 200,
  },
  {
    field: 'code',
    headerName: 'CÓDIGO',
    minWidth: 150,
  },
  {
    field: 'updatedAt',
    headerName: 'ÚLTIMA ATUALIZAÇÃO',
    minWidth: 220,
  },
  {
    field: '',
    headerName: '',
    minWidth: 150,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: 'right',
    flex: 1,
    renderCell: params => {
      const navigate = useNavigate();

      const onArrowIconClick = () => {
        navigate(params.id.toString());
      };

      return (
        <IconButton onClick={onArrowIconClick}>
          <ArrowForwardIosRoundedIcon fontSize="small" />
        </IconButton>
      );
    },
  }
];

const rows = [
  { id: 1, name: 'Internet APF', responsible: 'Onboarding BB', code: '12345678', updatedAt: '20/01/2022' },
  { id: 2, name: 'EBB Minha Página', responsible: 'Onboarding BB', code: '23456781', updatedAt: '20/01/2022' },
  { id: 3, name: 'EBB Minha Página', responsible: 'Onboarding BB', code: 'Conteúdo', updatedAt: '20/01/2022' },
  { id: 4, name: 'EBB Minha Página', responsible: 'Onboarding BB', code: 'Conteúdo', updatedAt: '20/01/2022' },
  { id: 5, name: 'EBB Minha Página', responsible: 'Onboarding BB', code: 'Conteúdo', updatedAt: '20/01/2022' },
  { id: 6, name: 'EBB Minha Página', responsible: 'Onboarding BB', code: 'Conteúdo', updatedAt: '20/01/2022' },
  { id: 7, name: 'EBB Minha Página', responsible: 'Onboarding BB', code: 'Conteúdo', updatedAt: '20/01/2022' },
  { id: 8, name: 'EBB Minha Página', responsible: 'Onboarding BB', code: 'Conteúdo', updatedAt: '20/01/2022' },
  { id: 9, name: 'EBB Minha Página', responsible: 'Onboarding BB', code: 'Conteúdo', updatedAt: '20/01/2022' },
  { id: 10, name: 'EBB Minha Página', responsible: 'Onboarding BB', code: 'Conteúdo', updatedAt: '20/01/2022' },
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
        <h1>Folhas de Regra</h1>
        <div className={classes.headingButtonsContainer}>
          <AuthorizedComponent permissions={["admin"]}>
            <Button variant="contained" color="secondary" onClick={handleButtonCreateOnClick}>
              Nova Folha de Regras
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
