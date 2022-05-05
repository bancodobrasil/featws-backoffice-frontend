import React from 'react';
import { Box, Button, IconButton, Paper } from '@material-ui/core';
import Style from './Style';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import AuthorizedComponent from '../../../components/Auth/AuthorizedComponent';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Nome da Folha',
    minWidth: 300,
  },
  {
    field: 'responsible',
    headerName: 'Responsável',
    minWidth: 200,
  },
  {
    field: 'code',
    headerName: 'Código',
    minWidth: 150,
  },
  {
    field: 'updatedAt',
    type: 'date',
    headerName: 'Última atualização',
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

      const onArrowIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        navigate(params.id.toString());
      };

      return (
        <IconButton onClick={onArrowIconClick}>
          <ArrowForwardIosRoundedIcon fontSize="small" />
        </IconButton>
      );
    },
  },
];

const rows = [
  {
    id: 1,
    name: 'Internet APF',
    responsible: 'Onboarding BB',
    code: '12345678',
    updatedAt: new Date(2022, 0, 20, 10, 55, 30, 500),
  },
  {
    id: 2,
    name: 'EBB Minha Página',
    responsible: 'Onboarding BB',
    code: '23456781',
    updatedAt: new Date(2022, 0, 20, 10, 55, 30, 500),
  },
  {
    id: 3,
    name: 'EBB Minha Página',
    responsible: 'Onboarding BB',
    code: 'Conteúdo',
    updatedAt: new Date(2022, 0, 20, 10, 55, 30, 500),
  },
  {
    id: 4,
    name: 'EBB Minha Página',
    responsible: 'Onboarding BB',
    code: 'Conteúdo',
    updatedAt: new Date(2022, 0, 20, 10, 55, 30, 500),
  },
  {
    id: 5,
    name: 'EBB Minha Página',
    responsible: 'Onboarding BB',
    code: 'Conteúdo',
    updatedAt: new Date(2022, 0, 20, 10, 55, 30, 500),
  },
  {
    id: 6,
    name: 'EBB Minha Página',
    responsible: 'Onboarding BB',
    code: 'Conteúdo',
    updatedAt: new Date(2022, 0, 20, 10, 55, 30, 500),
  },
  {
    id: 7,
    name: 'EBB Minha Página',
    responsible: 'Onboarding BB',
    code: 'Conteúdo',
    updatedAt: new Date(2022, 0, 20, 10, 55, 30, 500),
  },
  {
    id: 8,
    name: 'EBB Minha Página',
    responsible: 'Onboarding BB',
    code: 'Conteúdo',
    updatedAt: new Date(2022, 0, 20, 10, 55, 30, 500),
  },
  {
    id: 9,
    name: 'EBB Minha Página',
    responsible: 'Onboarding BB',
    code: 'Conteúdo',
    updatedAt: new Date(2022, 0, 20, 10, 55, 30, 500),
  },
  {
    id: 10,
    name: 'EBB Minha Página',
    responsible: 'Onboarding BB',
    code: 'Conteúdo',
    updatedAt: new Date(2022, 0, 20, 10, 55, 30, 500),
  },
];

export const ListRuleSheet = () => {
  const navigate = useNavigate();

  const classes = Style();

  const handleButtonCreateOnClick = () => {
    navigate('create');
  };

  const onSelectionModelChangeHandler = (selectionModel: GridSelectionModel) => {
    if (selectionModel.length > 0) {
      navigate(selectionModel[0].toString());
    }
  };

  return (
    <Box className={classes.root}>
      <div className={classes.headingContainer}>
        <h1>Folhas de Regra</h1>
        <div className={classes.headingButtonsContainer}>
          <AuthorizedComponent permissions={['admin']}>
            <Button variant="contained" color="primary" onClick={handleButtonCreateOnClick}>
              + Nova Folha de Regras
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
          onSelectionModelChange={onSelectionModelChangeHandler}
        />
      </Paper>
    </Box>
  );
};
