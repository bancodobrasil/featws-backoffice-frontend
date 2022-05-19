/* eslint-disable no-console */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { IRule, IRuleSheet } from '../../../interfaces';
import { DeferRulesConfirmation, DeferRulesList } from './screens';
import './Styles.css';
import { AppBreadcrumbs } from '../../../components/AppBreadcrumbs';

export enum EnumDeferRulesScreens {
  LIST = 'LIST',
  CONFIRMATION = 'CONFIRMATION',
}

export const DeferRules = () => {
  const { t } = useTranslation();

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

  const screenNode = useRef<HTMLDivElement>();

  const scrollTop = () => {
    // Workaround for window.scrollTo(0, 0); to work. It is not working with the inherited CSS from APW (body height 100%).
    Array.from(document.getElementsByClassName('apw-root-jss1'))[0].scrollTo(0, 0);
  };

  const onBackClickHandler = (action?: () => void) => {
    if (action) {
      action();
      return;
    }
    if (currentScreen === EnumDeferRulesScreens.CONFIRMATION) {
      setCurrentScreen(EnumDeferRulesScreens.LIST);
      return;
    }
    navigate(`/rulesheets/${id}`);
  };

  const onBackClickHandlerOverride = () => {
    onBackClickHandler();
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
      id: Number(id),
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
  }, [id, loadingRecord]);

  useEffect(() => {
    if (!record) {
      fetchRecord();
      return;
    }
    setRules(record.rules);
  }, [record, fetchRecord]);

  const renderLoadingRecord = () => (
    <Box
      sx={{
        marginTop: '24px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h2" component="p">
        Carregando lista de Regras...
      </Typography>
    </Box>
  );

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
    <Box
      sx={{
        width: '100%',
        paddingTop: '34px',
        paddingBottom: '34px',
      }}
    >
      <SwitchTransition>
        <CSSTransition
          key={currentScreen}
          nodeRef={screenNode}
          timeout={1000}
          classNames="fade-and-slide"
          onExited={scrollTop}
        >
          <div ref={screenNode}>
            <div className="transition-root">
              <AppBreadcrumbs
                items={[
                  { label: t('application.title'), navigateTo: '/' },
                  { label: record?.name, navigateTo: `/rulesheets/${id}` },
                  { label: 'Deferimento' },
                ]}
                onBack={onBackClickHandlerOverride}
              />
              {renderCurrentScreen()}
            </div>
          </div>
        </CSSTransition>
      </SwitchTransition>
    </Box>
  );
};
