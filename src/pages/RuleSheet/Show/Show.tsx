import React, { Suspense, useMemo, useState } from 'react';
import { TFunction, useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Chip,
  Dialog,
  FormControl,
  Grid,
  IconButton,
  Link,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { NavigateFunction, useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IRule, IRuleSheet } from '../../../interfaces';
import { RuleStatusEnum } from '../../../types';
import AuthorizedComponent from '../../../components/Auth/AuthorizedComponent';
import StatusBullet from '../../../components/StatusBullet';
import { FilterSelect } from '../../../components/FilterSelect';
import { AppBreadcrumbs } from '../../../components/AppBreadcrumbs';
import Loading from '../../../components/Loading';
import ErrorBoundary, { ErrorFallbackWithBreadcrumbs } from '../../../components/ErrorBoundary';
import { getRuleSheet } from '../../../api/services/RuleSheets';
import { WrapPromise } from '../../../utils/suspense/WrapPromise';

const CustomRadio = ({
  value,
  disabled,
  title,
  message,
}: {
  value: string;
  disabled?: boolean;
  title: string;
  message: string;
}): JSX.Element => (
  <Box sx={{ pt: '14px', pb: '12px', pl: '18px', pr: '16px' }}>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Radio
        value={value}
        disabled={disabled}
        icon={<RadioButtonUncheckedIcon color={disabled ? 'disabled' : 'primary'} />}
        checkedIcon={<RadioButtonCheckedIcon sx={{ color: '#3354FD' }} />}
        sx={{ p: '0' }}
      />
      <Typography
        variant="h5"
        component="p"
        sx={{ ml: '9px', height: '24px', color: disabled ? 'rgba(0, 0, 0, 0.26)' : 'text.primary' }}
      >
        {title}
      </Typography>
    </Box>
    <Typography
      variant="body1"
      component="p"
      sx={{ ml: '31px', color: disabled ? 'rgba(0, 0, 0, 0.26)' : '#6C7077' }}
    >
      {message}
    </Typography>
  </Box>
);

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

  const [isDialogCreateRuleOpen, setIsDialogCreateRuleOpen] = useState<boolean>(false);
  const [createRuleType, setCreateRuleType] = useState<string>('apf');

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

  const handleOpenCreateRuleDialog = () => {
    setIsDialogCreateRuleOpen(true);
  };

  const handleCloseCreateRuleDialog = () => {
    setIsDialogCreateRuleOpen(false);
  };

  const handleCreateRuleOk = () => {
    handleCloseCreateRuleDialog();
  };

  const handleCreateRuleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateRuleType(event.target.value);
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

  const renderCreateRuleDialog = () => (
    <Dialog
      onClose={handleCloseCreateRuleDialog}
      aria-labelledby="confirmation-dialog-title"
      open={isDialogCreateRuleOpen}
      sx={{
        '& .MuiDialog-paper': {
          padding: '16px',
        },
      }}
    >
      <Box
        id="confirmation-dialog-title"
        sx={{
          display: 'flex',
          alignItems: 'center',
          '& h3': {
            flex: 1,
            margin: 0,
            fontWeight: 700,
            fontSize: 22,
          },
        }}
      >
        <h3>{t('rulesheet.dialogs.createRule.title')}</h3>
        <IconButton size="small" onClick={handleCloseCreateRuleDialog} sx={{ ml: '16px' }}>
          <CancelIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box
        sx={{
          marginTop: '16px',
          marginBottom: '32px',
          fontSize: 16,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {t('rulesheet.dialogs.createRule.message')}
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            value={createRuleType}
            onChange={handleCreateRuleTypeChange}
          >
            <Paper
              elevation={0}
              sx={{
                mt: '32px',
                mb: '8px',
                border: `1px solid ${createRuleType === 'blueprint' ? '#3354FD' : '#B4B9C1'}`,
                borderRadius: '4px',
              }}
            >
              <CustomRadio
                value="blueprint"
                disabled
                title={t('rulesheet.dialogs.createRule.types.blueprint.title')}
                message={t('rulesheet.dialogs.createRule.types.blueprint.message')}
              />
            </Paper>
            <Paper
              elevation={0}
              sx={{
                mb: '8px',
                border: `1px solid ${createRuleType === 'apf' ? '#3354FD' : '#B4B9C1'}`,
                borderRadius: '4px',
              }}
            >
              <CustomRadio
                value="apf"
                title={t('rulesheet.dialogs.createRule.types.apf.title')}
                message={t('rulesheet.dialogs.createRule.types.apf.message')}
              />
            </Paper>
            <Paper
              elevation={0}
              sx={{
                mb: '8px',
                border: `1px solid ${createRuleType === 'text' ? '#3354FD' : '#B4B9C1'}`,
                borderRadius: '4px',
              }}
            >
              <CustomRadio
                value="text"
                disabled
                title={t('rulesheet.dialogs.createRule.types.text.title')}
                message={t('rulesheet.dialogs.createRule.types.text.message')}
              />
            </Paper>
          </RadioGroup>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          autoFocus
          onClick={handleCloseCreateRuleDialog}
          color="secondary"
          variant="contained"
        >
          {t('buttons.cancel')}
        </Button>
        <Button
          onClick={handleCreateRuleOk}
          color="primary"
          variant="contained"
          sx={{
            marginLeft: '16px',
          }}
        >
          {t('rulesheet.buttons.createRule')}
        </Button>
      </Box>
    </Dialog>
  );

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
            <Button variant="contained" color="primary" onClick={handleOpenCreateRuleDialog}>
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
                marginBottom: '16px',
                width: '100%',
              }}
              onClick={onDeferRuleClickHandler}
            >
              {t('rulesheet.buttons.deferRule')}
            </Button>
          </AuthorizedComponent>
          <AuthorizedComponent permissions={['admin']}>
            <Link
              color="link.main"
              component={RouterLink}
              to={`/rulesheets/${id}/cancel`}
              sx={{ fontSize: '16px', letterSpacing: '0.5px' }}
            >
              {t('rulesheet.links.cancel', { count: 2 })}
            </Link>
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
                <MenuItem value={RuleStatusEnum.DRAFT}>
                  {t(`rule.fields.status.${RuleStatusEnum.DRAFT}`)}
                </MenuItem>
                <MenuItem value={RuleStatusEnum.AWAITING_DEFERRAL}>
                  {t(`rule.fields.status.${RuleStatusEnum.AWAITING_DEFERRAL}`)}
                </MenuItem>
                <MenuItem value={RuleStatusEnum.DEFERRED}>
                  {t(`rule.fields.status.${RuleStatusEnum.DEFERRED}`)}
                </MenuItem>
                <MenuItem value={RuleStatusEnum.AWAITING_CANCELLATION}>
                  {t(`rule.fields.status.${RuleStatusEnum.AWAITING_CANCELLATION}`)}
                </MenuItem>
                <MenuItem value={RuleStatusEnum.CANCELED}>
                  {t(`rule.fields.status.${RuleStatusEnum.CANCELED}`)}
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
      {renderCreateRuleDialog()}
    </Box>
  );
};

export const ShowRuleSheet = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { id } = useParams();

  const resource = getRuleSheet(id);

  const onBackClickHandler = () => {
    navigate('/rulesheets');
  };

  return (
    <ErrorBoundary
      fallback={
        <ErrorFallbackWithBreadcrumbs
          message={t('common.error.service.get', { resource: t('rulesheet.name') })}
          appBreadcrumbsProps={{
            items: [
              { label: t('application.title'), navigateTo: '/' },
              { label: t('rulesheet.name') },
            ],
            onBack: onBackClickHandler,
          }}
        />
      }
    >
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
