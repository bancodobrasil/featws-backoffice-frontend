import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Grid,
  IconButton,
  Link,
  MenuItem,
  Typography,
} from '@mui/material';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IRule, IRuleSheet } from '../../../interfaces';
import AuthorizedComponent from '../../../components/Auth/AuthorizedComponent';
import StatusBullet from '../../../components/StatusBullet';
import { BreadcrumbsSeparator } from '../../../components/BreadcrumbsSeparator';
import { FilterSelect } from '../../../components/FilterSelect';

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
    renderCell: params => (
      <Chip
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.08)',
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '20px',
          letterSpacing: '0.25px',
          '& .MuiChip-label': {
            paddingLeft: '4px',
          },
        }}
        avatar={<StatusBullet status={params.value as string} />}
        label={params.value}
      />
    ),
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
      <Typography
        key={index}
        component="p"
        sx={{
          margin: 0,
          color: '#444444',
          fontSize: '18px',
          lineHeight: '25.2px',
        }}
      >
        {line}
      </Typography>
    ));

  const renderLoadingRecord = () => (
    <Box
      sx={{
        marginTop: '24px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h2" component="p">
        Carregando Folha de Regras...
      </Typography>
    </Box>
  );

  if (loadingRecord) {
    return renderLoadingRecord();
  }

  return (
    <Box
      sx={{
        width: '100%',
        paddingTop: '34px',
        paddingBottom: '34px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          left: '-5px',
          top: '-5px',
        }}
      >
        <IconButton onClick={onBackClickHandler} size="small">
          <ArrowBackIcon fontSize="small" color="primary" />
        </IconButton>
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{
            marginLeft: '5px',
            color: '#000000',
            fontWeight: 300,
            fontSize: '14px',
            lineHeight: '24px',
            letterSpacing: '0.1px',
          }}
        >
          <Link color="textPrimary" component={RouterLink} to="/">
            FeatWS
          </Link>
          <BreadcrumbsSeparator />
          <Link color="textPrimary" component={RouterLink} to={`/rulesheets/${id}`}>
            {record?.name}
          </Link>
          <BreadcrumbsSeparator last />
          <Typography
            component="span"
            sx={{
              color: '#BFC3CA',
            }}
          >
            Regras
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          paddingTop: '11px',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 700,
            fontSize: '24px',
            lineHeight: '24px',
            letterSpacing: '0.18px',
            margin: 0,
          }}
        >
          {record?.name}
        </Typography>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <AuthorizedComponent permissions={['admin']}>
            <Button variant="contained" color="primary">
              + Nova Regra
            </Button>
          </AuthorizedComponent>
        </Box>
      </Box>
      <Grid
        container
        sx={{
          marginTop: '26px',
        }}
      >
        <Grid item xs={3}>
          <Chip
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.08)',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '20px',
              letterSpacing: '0.25px',
            }}
            label={record?.slug}
          />
          <Box
            sx={{
              marginTop: '28px',
              marginBottom: '24px',
            }}
          >
            {renderDescription()}
          </Box>
          <Box
            sx={{
              fontWeight: 700,
              fontSize: '14px',
              marginBottom: '8px',
            }}
          >
            Código da folha: {record?.code}
          </Box>
          <Box
            sx={{
              fontWeight: 700,
              fontSize: '14px',
              marginBottom: '24px',
            }}
          >
            Total de regras: 24
          </Box>
          <AuthorizedComponent permissions={['admin']}>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                marginBottom: '20px',
                width: '100%',
              }}
              onClick={onDeferRuleClickHandler}
            >
              Deferir uma Regra
            </Button>
          </AuthorizedComponent>
        </Grid>
        <Grid
          item
          xs={9}
          sx={{
            paddingLeft: '81px',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              margin: 0,
              fontWeight: 700,
              fontSize: '24px',
              lineHeight: '24px',
              letterSpacing: '0.18px',
            }}
          >
            Regras
          </Typography>
          <div>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: '24px',
                my: '16px',
              }}
            >
              Filtros
            </Typography>
            <div>
              <FilterSelect
                id="filter-status-select"
                label="Filtrar por status"
                value={status}
                onChange={onStatusChangeHandler}
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="Deferida">Deferida</MenuItem>
                <MenuItem value="Aguardando deferimento">Aguardando deferimento</MenuItem>
                <MenuItem value="Rascunho">Rascunho</MenuItem>
              </FilterSelect>
              <FilterSelect
                id="filter-author-select"
                label="Filtrar por autor"
                value={author}
                onChange={onAuthorChangeHandler}
              >
                <MenuItem value="">Todos</MenuItem>
                {[...new Set(record?.rules.map(rule => rule.author))].map((ruleAuthor, index) => (
                  <MenuItem key={index} value={ruleAuthor}>
                    {ruleAuthor}
                  </MenuItem>
                ))}
              </FilterSelect>
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  width: 169,
                }}
                onClick={onSearchClickHandler}
              >
                Buscar
              </Button>
            </div>
          </div>
          <DataGrid
            sx={{
              marginTop: '16px',
            }}
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
