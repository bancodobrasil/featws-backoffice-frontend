import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, IconButton, Paper, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import AuthorizedComponent from '../../../components/Auth/AuthorizedComponent';
import { IRuleSheet } from '../../../interfaces';
import { getAllRuleSheets } from '../../../api/services/RuleSheets';

export const ListRuleSheet = () => {
  const navigate = useNavigate();

  const [records, setRecords] = useState<IRuleSheet[] | undefined>();
  const [loadingRecords, setLoadingRecords] = useState<boolean>(false);

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

  const fetchRecords = useCallback(async () => {
    if (loadingRecords) {
      return;
    }
    setLoadingRecords(true);

    const data = await getAllRuleSheets();

    setRecords(data);

    setLoadingRecords(false);
  }, [loadingRecords]);

  useEffect(() => {
    if (!records) {
      fetchRecords();
      return;
    }
  }, [records, fetchRecords]);

  const handleButtonCreateOnClick = () => {
    navigate('create');
  };

  const onSelectionModelChangeHandler = (selectionModel: GridSelectionModel) => {
    if (selectionModel.length > 0) {
      navigate(selectionModel[0].toString());
    }
  };

  if (loadingRecords) {
    return (
      <Box
        sx={{
          marginTop: '24px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h2" component="p">
          Carregando lista de Folha de Regras...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        paddingTop: '16px',
        paddingBottom: '16px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <h1>Folhas de Regra</h1>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <AuthorizedComponent permissions={['admin']}>
            <Button variant="contained" color="primary" onClick={handleButtonCreateOnClick}>
              + Nova Folha de Regras
            </Button>
          </AuthorizedComponent>
        </Box>
      </Box>
      <Paper
        sx={{
          marginTop: '16px',
        }}
        elevation={0}
      >
        <DataGrid
          sx={{
            '& .MuiDataGrid-main .MuiDataGrid-cell': {
              cursor: 'pointer',
            },
          }}
          rows={records}
          columns={columns}
          pageSize={10}
          autoHeight
          onSelectionModelChange={onSelectionModelChangeHandler}
        />
      </Paper>
    </Box>
  );
};
