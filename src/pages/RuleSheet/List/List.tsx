import React, { Suspense, useMemo } from 'react';
import { Box, Button, IconButton, Paper } from '@mui/material';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useTranslation } from 'react-i18next';
import AuthorizedComponent from '../../../components/Auth/AuthorizedComponent';
import { getAllRuleSheets } from '../../../api/services/RuleSheets';
import Loading from '../../../components/Loading';
import ErrorBoundary from '../../../components/ErrorBoundary';

const resource = getAllRuleSheets();

const DataGridWrapper = ({
  columns,
  navigate,
}: {
  columns: GridColDef[];
  navigate: NavigateFunction;
}): JSX.Element => {
  const records = resource.read();

  const onSelectionModelChangeHandler = (selectionModel: GridSelectionModel) => {
    if (selectionModel.length > 0) {
      navigate(selectionModel[0].toString());
    }
  };

  return (
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
  );
};

export const ListRuleSheet = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'name',
        headerName: t('rulesheet.of', { field: 'name' }),
        minWidth: 300,
      },
      {
        field: 'responsible',
        headerName: t('rulesheet.fields.responsible'),
        minWidth: 200,
      },
      {
        field: 'code',
        headerName: t('rulesheet.fields.code'),
        minWidth: 150,
      },
      {
        field: 'updatedAt',
        type: 'date',
        headerName: t('rulesheet.fields.updatedAt'),
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
    ],
    [t, navigate],
  );

  const handleButtonCreateOnClick = () => {
    navigate('create');
  };

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
        <h1>{t('rulesheet.titles.list')}</h1>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <AuthorizedComponent permissions={['admin']}>
            <Button variant="contained" color="primary" onClick={handleButtonCreateOnClick}>
              + {t('rulesheet.new')}
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
        <ErrorBoundary
          fallback={t('common.error.service.getAll', { resource: t('rulesheet.name') })}
        >
          <Suspense fallback={<Loading />}>
            <DataGridWrapper columns={columns} navigate={navigate} />
          </Suspense>
        </ErrorBoundary>
      </Paper>
    </Box>
  );
};
