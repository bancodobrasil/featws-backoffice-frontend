import React, { Suspense, useMemo, useState } from 'react';
import { TFunction, useTranslation } from 'react-i18next';
import { Box, Button, Chip, Grid, MenuItem, Typography } from '@mui/material';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IRule, IRuleSheet } from '../../../interfaces';
import { RuleStatusEnum } from '../../../types';
import AuthorizedComponent from '../../../components/Auth/AuthorizedComponent';
import StatusBullet from '../../../components/StatusBullet';
import { FilterSelect } from '../../../components/FilterSelect';
import { AppBreadcrumbs } from '../../../components/AppBreadcrumbs';
import Loading from '../../../components/Loading';
import ErrorBoundary, { ErrorFallback } from '../../../components/ErrorBoundary';
import { getRuleSheet } from '../../../api/services/RuleSheets';
import { WrapPromise } from '../../../utils/suspense/WrapPromise';

const PageWrapper = ({
  id,
  resource,
  onBackClickHandler,
  t,
  navigate,
}: {
  id: string;
  resource: WrapPromise<IRuleSheet>;
  onBackClickHandler: () => void;
  t: TFunction;
  navigate: NavigateFunction;
}): JSX.Element => {
  const record = resource.read();

  const [pageSize, setPageSize] = useState<number>(10);

  const [status, setStatus] = useState<string | undefined>('');
  const [author, setAuthor] = useState<string | undefined>('');
  const [rules, setRules] = useState<IRule[]>(record.rules);

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'title',
        headerName: t('rule.fields.title'),
        minWidth: 200,
      },
      {
        field: 'date',
        headerName: t('rule.fields.date'),
        minWidth: 150,
        type: 'date',
      },
      {
        field: 'author',
        headerName: t('rule.fields.author'),
        minWidth: 250,
        sortable: false,
      },
      {
        field: 'status',
        headerName: t('rule.fields.status.name'),
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
            label={t(`rule.fields.status.${params.value as string}`)}
          />
        ),
      },
    ],
    [t],
  );

  const onDeferRuleClickHandler = () => {
    navigate(`/rulesheets/${id}/defer`);
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
    let listRule = record.rules;
    if (status) {
      listRule = listRule.filter(rule => rule.status === status);
    }
    if (author) {
      listRule = listRule.filter(rule => rule.author === author);
    }
    setRules(listRule);
  };

  const renderDescription = () =>
    record.description.split('\n').map((line, index) => (
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

  const onPageSizeChangeHandler = (newPageSize: number) => {
    setPageSize(newPageSize);
  };

  return (
    <Box
      sx={{
        width: '100%',
        paddingTop: '34px',
        paddingBottom: '34px',
      }}
    >
      <AppBreadcrumbs
        items={[
          { label: t('application.title'), navigateTo: '/' },
          { label: record.name, navigateTo: `/rulesheets/${id}` },
          { label: t('rule.name', { count: 2 }) },
        ]}
        onBack={onBackClickHandler}
      />
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
          {record.name}
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
              + {t('rule.new')}
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
            label={record.slug}
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
            {t('rulesheet.of', { field: 'code' })}: {record.code}
          </Box>
          <Box
            sx={{
              fontWeight: 700,
              fontSize: '14px',
              marginBottom: '24px',
            }}
          >
            {t('common.totalOf', { field: t('rule.name', { count: 2 }).toLowerCase() })}: 24
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
              {t('rulesheet.buttons.deferRule')}
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
            {t('rule.name', { count: 2 })}
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
              {t('filter.title')}
            </Typography>
            <div>
              <FilterSelect
                id="filter-status-select"
                label={t('filter.by', { field: t('rule.fields.status.name').toLowerCase() })}
                value={status}
                onChange={onStatusChangeHandler}
              >
                <MenuItem value="">{t('filter.all')}</MenuItem>
                <MenuItem value={RuleStatusEnum.DEFERRED}>
                  {t(`rule.fields.status.${RuleStatusEnum.DEFERRED}`)}
                </MenuItem>
                <MenuItem value={RuleStatusEnum.AWAITING}>
                  {t(`rule.fields.status.${RuleStatusEnum.AWAITING}`)}
                </MenuItem>
                <MenuItem value={RuleStatusEnum.DRAFT}>
                  {t(`rule.fields.status.${RuleStatusEnum.DRAFT}`)}
                </MenuItem>
              </FilterSelect>
              <FilterSelect
                id="filter-author-select"
                label={t('filter.by', { field: t('rule.fields.author').toLowerCase() })}
                value={author}
                onChange={onAuthorChangeHandler}
              >
                <MenuItem value="">{t('filter.all')}</MenuItem>
                {[...new Set(record.rules.map(rule => rule.author))].map((ruleAuthor, index) => (
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
                {t('buttons.search')}
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

const CustomErrorFallback = ({
  t,
  onBackClickHandler,
}: {
  t: TFunction;
  onBackClickHandler: () => void;
}): JSX.Element => (
  <Box
    sx={{
      width: '100%',
      paddingTop: '34px',
      paddingBottom: '34px',
    }}
  >
    <AppBreadcrumbs
      items={[{ label: t('application.title'), navigateTo: '/' }, { label: t('rulesheet.name') }]}
      onBack={onBackClickHandler}
    />
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '11px',
      }}
    >
      <ErrorFallback message={t('common.error.service.get', { resource: t('rulesheet.name') })} />
    </Box>
  </Box>
);

export const ShowRuleSheet = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { id } = useParams();

  const resource = getRuleSheet(id);

  const onBackClickHandler = () => {
    navigate('/rulesheets');
  };

  return (
    <ErrorBoundary fallback={<CustomErrorFallback t={t} onBackClickHandler={onBackClickHandler} />}>
      <Suspense fallback={<Loading />}>
        <PageWrapper
          id={id}
          resource={resource}
          onBackClickHandler={onBackClickHandler}
          t={t}
          navigate={navigate}
        />
      </Suspense>
    </ErrorBoundary>
  );
};
