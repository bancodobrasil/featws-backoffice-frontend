import React, { useEffect, useState } from 'react';
import { Box, Button, Chip, Grid, Typography } from '@material-ui/core';
import Style from './Style';
import { useNavigate, useParams } from 'react-router-dom';
import { IRuleSheet } from '../../../interfaces';
import AuthorizedComponent from '../../../components/Auth/AuthorizedComponent';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  {
    field: 'title',
    headerName: 'Título',
    minWidth: 200,
  },
  {
    field: 'date',
    headerName: 'Data',
    minWidth: 150,
  },
  {
    field: 'author',
    headerName: 'Autor',
    minWidth: 250,
  },
  {
    field: 'status',
    headerName: 'Status',
    minWidth: 250,
  },
];

export const ShowRuleSheet = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [record, setRecord] = useState<IRuleSheet | undefined>();
  const [loadingRecord, setLoadingRecord] = useState<boolean>(false);

  const classes = Style();

  const fetchRecord = async () => {
    if (loadingRecord) {
      return;
    }
    setLoadingRecord(true);
    // TODO: Implement the API request
    // The Promise below simulates the loading time of the request, remove it when you implement the request itself.
    await new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
    // Remove the next line when the request is implemented.
    setRecord({
      id,
      name: 'Internet APF',
      slug: 'internet-apf',
      description:
        'É uma plataforma de onboarding para não correntistas e correntistas PF/PJ e GOV. \nO objetivo é que cada cliente acesse uma página que reflita, de maneira personalizada, os seus interesses e serviços do Banco do Brasil',
      code: '12345678',
      rules: [
        {
          id: '1',
          title: 'Alteração no Bundle',
          date: '02/02/2022',
          author: 'C1313233 Rhuan Queiroz',
          status: 'Deferida',
        },
        {
          id: '2',
          title: 'Alteração no Bundle',
          date: '02/02/2022',
          author: 'C1313233 Rhuan Queiroz',
          status: 'Deferida',
        },
        {
          id: '3',
          title: 'Alteração no Bundle',
          date: '02/02/2022',
          author: 'C1313233 Rhuan Queiroz',
          status: 'Deferida',
        },
        {
          id: '4',
          title: 'Alteração no Bundle',
          date: '02/02/2022',
          author: 'C1313233 Rhuan Queiroz',
          status: 'Deferida',
        },
        {
          id: '5',
          title: 'Alteração no Bundle',
          date: '02/02/2022',
          author: 'C1313233 Rhuan Queiroz',
          status: 'Deferida',
        },
        {
          id: '6',
          title: 'Alteração no Bundle',
          date: '02/02/2022',
          author: 'C1313233 Rhuan Queiroz',
          status: 'Deferida',
        },
        {
          id: '7',
          title: 'Alteração no Bundle',
          date: '02/02/2022',
          author: 'C1313233 Rhuan Queiroz',
          status: 'Deferida',
        },
        {
          id: '8',
          title: 'Alteração no Bundle',
          date: '02/02/2022',
          author: 'C1313233 Rhuan Queiroz',
          status: 'Deferida',
        },
        {
          id: '9',
          title: 'Alteração no Bundle',
          date: '02/02/2022',
          author: 'C1313233 Rhuan Queiroz',
          status: 'Deferida',
        },
      ],
    });
    setLoadingRecord(false);
  };

  useEffect(() => {
    fetchRecord();
  }, []);

  const renderDescription = () => {
    return record?.description.split('\n').map((line, index) => (
      <p key={index} className={classes.description}>
        {line}
      </p>
    ));
  };

  const renderLoadingRecord = () => {
    return (
      <div className={classes.loadingRecord}>
        <Typography variant="h2" component="p">
          Loading...
        </Typography>
      </div>
    );
  };

  if (loadingRecord) {
    return renderLoadingRecord();
  }

  return (
    <Box className={classes.root}>
      <div className={classes.headingContainer}>
        <h1 className={classes.h1}>{record?.name}</h1>
        <div className={classes.headingButtonsContainer}>
          <AuthorizedComponent permissions={['admin']}>
            <Button variant="contained" color="primary">
              + Nova Regra
            </Button>
          </AuthorizedComponent>
        </div>
      </div>
      <Grid container className={classes.gridContainer}>
        <Grid item xs={3} className={classes.gridLeft}>
          <Chip size="small" className={classes.chipSlug} label={record?.slug} />
          <div className={classes.descriptionContainer}>{renderDescription()}</div>
          <div className={classes.code}>Código da folha: {record?.code}</div>
          <div className={classes.rulesTotal}>Total de regras: 24</div>
          <Button variant="contained" color="secondary" className={classes.deferRuleButton}>
            Deferir uma Regra
          </Button>
        </Grid>
        <Grid item xs={9} className={classes.gridRight}>
          <h2 className={classes.rulesHeading}>Regras</h2>
          <DataGrid
            className={classes.dataGrid}
            rows={record?.rules || []}
            columns={columns}
            pageSize={10}
            autoHeight
            disableSelectionOnClick
          />
        </Grid>
      </Grid>
    </Box>
  );
};
