import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IRule, IRuleSheet } from '../../../interfaces';
import AuthorizedComponent from '../../../components/Auth/AuthorizedComponent';
import Style from './Style';
import StatusBullet from '../../../components/StatusBullet';

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
    type: 'date',
  },
  {
    field: 'author',
    headerName: 'Autor',
    minWidth: 250,
    sortable: false,
  },
  {
    field: 'status',
    headerName: 'Status',
    minWidth: 250,
    sortable: false,
    renderCell: params => {
      const classes = Style();

      return (
        <Chip
          className={classes.chipStatus}
          avatar={<StatusBullet status={params.value as string} />}
          label={params.value}
        />
      );
    },
  },
];

export const ShowRuleSheet = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [record, setRecord] = useState<IRuleSheet | undefined>();
  const [loadingRecord, setLoadingRecord] = useState<boolean>(false);

  const [pageSize, setPageSize] = useState<number>(10);

  const [status, setStatus] = useState<string | undefined>('');
  const [author, setAuthor] = useState<string | undefined>('');
  const [rules, setRules] = useState<IRule[]>([]);

  const classes = Style();

  const onDeferRuleClickHandler = () => {
    navigate(`/rulesheets/${id}/defer`);
  };

  const onBackClickHandler = () => {
    navigate('/rulesheets');
  };

  const onStatusChangeHandler = event => {
    setStatus(event.target.value);
  };

  const onAuthorChangeHandler = event => {
    setAuthor(event.target.value);
  };

  const onSearchClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    if (!record) {
      return;
    }
    let listRule = record.rules;
    if (status) {
      listRule = listRule.filter(rule => rule.status === status);
    }
    if (author) {
      listRule = listRule.filter(rule => rule.author === author);
    }
    setRules(listRule);
  };

  const onPageSizeChangeHandler = (newPageSize: number) => {
    setPageSize(newPageSize);
  };

  const fetchRecord = useCallback(async () => {
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
          date: new Date(2021, 11, 20, 10, 55, 30, 500),
          author: 'C1313233 Rhuan Queiroz',
          status: 'Deferida',
        },
        {
          id: '2',
          title: 'Alteração no Bundle',
          date: new Date(2022, 2, 5, 10, 55, 30, 500),
          author: 'C1313233 Rhuan Queiroz',
          status: 'Aguardando deferimento',
        },
        {
          id: '3',
          title: 'Alteração no Bundle',
          date: new Date(2022, 1, 2, 10, 55, 30, 500),
          author: 'C1313233 Rhuan Queiroz',
          status: 'Rascunho',
        },
        {
          id: '4',
          title: 'Alteração no Bundle',
          date: new Date(2022, 1, 2, 10, 55, 30, 500),
          author: 'C1313233 Rhuan Queiroz',
          status: 'Deferida',
        },
        {
          id: '5',
          title: 'Alteração no Bundle',
          date: new Date(2022, 1, 2, 10, 55, 30, 500),
          author: 'C1313233 Rhuan Queiroz',
          status: 'Deferida',
        },
        {
          id: '6',
          title: 'Alteração no Bundle',
          date: new Date(2022, 1, 2, 10, 55, 30, 500),
          author: 'C1313233 Rhuan Queiroz',
          status: 'Deferida',
        },
        {
          id: '7',
          title: 'Alteração no Bundle',
          date: new Date(2022, 1, 2, 10, 55, 30, 500),
          author: 'C1313233 Rhuan Queiroz',
          status: 'Deferida',
        },
        {
          id: '8',
          title: 'Alteração no Bundle',
          date: new Date(2022, 1, 2, 10, 55, 30, 500),
          author: 'C1313233 Rhuan Queiroz',
          status: 'Deferida',
        },
        {
          id: '9',
          title: 'Alteração no Bundle',
          date: new Date(2022, 1, 2, 10, 55, 30, 500),
          author: 'C1313233 Rhuan Queiroz',
          status: 'Deferida',
        },
      ],
    });
    setLoadingRecord(false);
  }, [id, loadingRecord]);

  useEffect(() => {
    if (!record) {
      fetchRecord();
      return;
    }
    setRules(record.rules);
  }, [record, fetchRecord]);

  const renderDescription = () =>
    record?.description.split('\n').map((line, index) => (
      <p key={index} className={classes.description}>
        {line}
      </p>
    ));

  const renderLoadingRecord = () => (
    <div className={classes.loadingRecord}>
      <Typography variant="h2" component="p">
        Carregando Folha de Regras...
      </Typography>
    </div>
  );

  if (loadingRecord) {
    return renderLoadingRecord();
  }

  return (
    <Box className={classes.root}>
      <div className={classes.breadcrumbsContainer}>
        <IconButton onClick={onBackClickHandler} size="small">
          <ArrowBackIcon fontSize="small" color="primary" />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
          <Link color="textPrimary" component={RouterLink} to="/">
            FeatWS
          </Link>
          <span className={classes.breadcrumbsSeparator}>/</span>
          <Link color="textPrimary" component={RouterLink} to={`/rulesheets/${id}`}>
            {record?.name}
          </Link>
          <span className={`${classes.breadcrumbsSeparator} last`}>/</span>
          <Typography component="span" className={classes.breadcrumbActive}>
            Regras
          </Typography>
        </Breadcrumbs>
      </div>
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
          <Chip className={classes.chipSlug} label={record?.slug} />
          <div className={classes.descriptionContainer}>{renderDescription()}</div>
          <div className={classes.code}>Código da folha: {record?.code}</div>
          <div className={classes.rulesTotal}>Total de regras: 24</div>
          <AuthorizedComponent permissions={['admin']}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.deferRuleButton}
              onClick={onDeferRuleClickHandler}
            >
              Deferir uma Regra
            </Button>
          </AuthorizedComponent>
        </Grid>
        <Grid item xs={9} className={classes.gridRight}>
          <h2 className={classes.rulesHeading}>Regras</h2>
          <div>
            <h3 className={classes.filtersHeading}>Filtros</h3>
            <div>
              <FormControl variant="outlined" className={classes.filterSelect}>
                <InputLabel id="filter-status-select-input-label">Filtrar por status</InputLabel>
                <Select
                  labelId="filter-status-select-label"
                  id="filter-status-select"
                  value={status}
                  onChange={onStatusChangeHandler}
                  label="Status"
                >
                  <MenuItem value="">Todos</MenuItem>
                  <MenuItem value="Deferida">Deferida</MenuItem>
                  <MenuItem value="Aguardando deferimento">Aguardando deferimento</MenuItem>
                  <MenuItem value="Rascunho">Rascunho</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined" className={classes.filterSelect}>
                <InputLabel id="filter-author-select-input-label">Filtrar por autor</InputLabel>
                <Select
                  labelId="filter-author-select-label"
                  id="filter-author-select"
                  value={author}
                  onChange={onAuthorChangeHandler}
                  label="Autor"
                >
                  <MenuItem value="">Todos</MenuItem>
                  {[...new Set(record?.rules.map(rule => rule.author))].map((ruleAuthor, index) => (
                    <MenuItem key={index} value={ruleAuthor}>
                      {ruleAuthor}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                color="secondary"
                className={classes.buttonSearch}
                onClick={onSearchClickHandler}
              >
                Buscar
              </Button>
            </div>
          </div>
          <DataGrid
            className={classes.dataGrid}
            rows={rules}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            onPageSizeChange={onPageSizeChangeHandler}
            autoHeight
            disableSelectionOnClick
          />
        </Grid>
      </Grid>
    </Box>
  );
};
