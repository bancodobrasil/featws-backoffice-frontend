import React, { useEffect, useState } from 'react';
import { Box, Breadcrumbs, IconButton, Link, Typography } from '@material-ui/core';
import Style from './Style';
import { useNavigate, useParams } from 'react-router-dom';
import { IRule, IRuleSheet } from '../../../interfaces';
import { Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { DeferRulesConfirmation, DeferRulesList } from './screens';

export enum EnumDeferRulesScreens {
  LIST = 'LIST',
  CONFIRMATION = 'CONFIRMATION',
}

export const DeferRules = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [record, setRecord] = useState<IRuleSheet | undefined>();
  const [loadingRecord, setLoadingRecord] = useState<boolean>(false);

  const [currentScreen, setCurrentScreen] = useState<EnumDeferRulesScreens>(
    EnumDeferRulesScreens.LIST,
  );

  const [pageSize, setPageSize] = useState<number>(10);

  const [listSelectionId, setListSelectionId] = useState<string[]>([]);

  const [code, setCode] = useState<string | undefined>('');
  const [author, setAuthor] = useState<string | undefined>('');
  const [rules, setRules] = useState<IRule[]>([]);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

  const classes = Style();

  const onBackClickHandler = (action?: () => void) => {
    if (action) {
      action();
      return;
    }
    navigate(`/rulesheets/${id}`);
  };

  const _onBackClickHandler = () => {
    onBackClickHandler();
  }

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
          date: new Date(2021, 11, 20, 10, 55, 30, 500),
          author: 'C1313233 Rhuan Queiroz',
          status: 'Aguardando deferimento',
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
          status: 'Aguardando deferimento',
        },
        {
          id: '4',
          title: 'Alteração no Bundle',
          date: new Date(2022, 1, 2, 10, 55, 30, 500),
          author: 'C1313233 Rhuan Queiroz',
          status: 'Aguardando deferimento',
        },
        {
          id: '5',
          title: 'Alteração no Bundle',
          date: new Date(2022, 1, 2, 10, 55, 30, 500),
          author: 'C1313233 Rhuan Queiroz',
          status: 'Aguardando deferimento',
        },
        {
          id: '6',
          title: 'Alteração no Bundle',
          date: new Date(2022, 1, 2, 10, 55, 30, 500),
          author: 'C1313233 Rhuan Queiroz',
          status: 'Aguardando deferimento',
        },
        {
          id: '7',
          title: 'Alteração no Bundle',
          date: new Date(2022, 1, 2, 10, 55, 30, 500),
          author: 'C1313233 Rhuan Queiroz',
          status: 'Aguardando deferimento',
        },
        {
          id: '8',
          title: 'Alteração no Bundle',
          date: new Date(2022, 1, 2, 10, 55, 30, 500),
          author: 'C1313233 Rhuan Queiroz',
          status: 'Aguardando deferimento',
        },
        {
          id: '9',
          title: 'Alteração no Bundle',
          date: new Date(2022, 1, 2, 10, 55, 30, 500),
          author: 'C1313233 Rhuan Queiroz',
          status: 'Aguardando deferimento',
        },
        {
          id: '10',
          title: 'Alteração no Bundle',
          date: new Date(2022, 1, 2, 10, 55, 30, 500),
          author: 'C1313233 Rhuan Queiroz',
          status: 'Aguardando deferimento',
        },
        {
          id: '11',
          title: 'Alteração no Bundle',
          date: new Date(2022, 1, 2, 10, 55, 30, 500),
          author: 'C1313233 Rhuan Queiroz',
          status: 'Aguardando deferimento',
        },
      ],
    });
    setLoadingRecord(false);
  };

  useEffect(() => {
    fetchRecord();
  }, []);

  useEffect(() => {
    if (!record) {
      return;
    }
    setRules(record.rules);
  }, [record]);

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

  const renderCurrentScreen = () => {
    if (currentScreen === EnumDeferRulesScreens.LIST) {
      return (
        <DeferRulesList
          record={record}
          pageSize={pageSize}
          listSelectionId={listSelectionId}
          code={code}
          author={author}
          rules={rules}
          isFiltering={isFiltering}
          setPageSize={setPageSize}
          setListSelectionId={setListSelectionId}
          setCode={setCode}
          setAuthor={setAuthor}
          setRules={setRules}
          setIsFiltering={setIsFiltering}
          onBackClickHandler={onBackClickHandler}
          setCurrentScreen={setCurrentScreen}
        />
      );
    }
    return (
      <DeferRulesConfirmation
        rulesheet={record}
        rules={rules.filter(rule => listSelectionId.includes(rule.id))}
        onBackClickHandler={onBackClickHandler}
        setCurrentScreen={setCurrentScreen}
      />
    );
  };

  return (
    <Box className={classes.root}>
      <div className={classes.breadcrumbsContainer}>
        <IconButton onClick={_onBackClickHandler} size="small">
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
          <span className={classes.breadcrumbsSeparator + ' last'}>/</span>
          <Typography component="span" className={classes.breadcrumbActive}>
            Deferimento
          </Typography>
        </Breadcrumbs>
      </div>
      {renderCurrentScreen()}
    </Box>
  );
};
