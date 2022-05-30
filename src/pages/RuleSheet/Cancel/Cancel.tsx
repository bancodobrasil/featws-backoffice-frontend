/* eslint-disable no-console */
import React, { Suspense, useRef, useState } from 'react';
import { TFunction, useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { IRule, IRuleSheet } from '../../../interfaces';
import { CancelRulesConfirmation, CancelRulesList } from './screens';
import './Styles.css';
import { AppBreadcrumbs } from '../../../components/AppBreadcrumbs';
import Loading from '../../../components/Loading';
import ErrorBoundary, { ErrorFallbackWithBreadcrumbs } from '../../../components/ErrorBoundary';
import { WrapPromise } from '../../../utils/suspense/WrapPromise';
import { getRuleSheet } from '../../../api/services/RuleSheets';
import { RuleStatusEnum } from '../../../types';

export enum EnumCancelRulesScreens {
  LIST = 'LIST',
  CONFIRMATION = 'CONFIRMATION',
}

const PageWrapper = ({
  id,
  resource,
  t,
  navigate,
}: {
  id: string;
  resource: WrapPromise<IRuleSheet>;
  t: TFunction;
  navigate: NavigateFunction;
}): JSX.Element => {
  const record = resource.read();

  const [currentScreen, setCurrentScreen] = useState<EnumCancelRulesScreens>(
    EnumCancelRulesScreens.LIST,
  );

  const [pageSize, setPageSize] = useState<number>(10);

  const [listSelectionId, setListSelectionId] = useState<string[]>([]);

  const [code, setCode] = useState<string | undefined>('');
  const [author, setAuthor] = useState<string | undefined>('');
  const [rules, setRules] = useState<IRule[]>(
    record.rules.filter(rule => rule.status === RuleStatusEnum.AWAITING_CANCELLATION),
  );
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
    if (currentScreen === EnumCancelRulesScreens.CONFIRMATION) {
      setCurrentScreen(EnumCancelRulesScreens.LIST);
      return;
    }
    navigate(`/rulesheets/${id}`);
  };

  const onBackClickHandlerOverride = () => {
    onBackClickHandler();
  };

  const renderCurrentScreen = () => {
    if (currentScreen === EnumCancelRulesScreens.LIST) {
      return (
        <CancelRulesList
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
      <CancelRulesConfirmation
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
                  { label: record.name, navigateTo: `/rulesheets/${id}` },
                  { label: t('rulesheet.cancel') },
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

export const CancelRules = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { id } = useParams();

  const resource = getRuleSheet(id);

  return (
    <ErrorBoundary
      fallback={
        <ErrorFallbackWithBreadcrumbs
          message={t('common.error.service.get', { resource: t('rulesheet.name') })}
          appBreadcrumbsProps={{
            items: [
              { label: t('application.title'), navigateTo: '/' },
              { label: t('rulesheet.name') },
              { label: t('rulesheet.cancel') },
            ],
            onBack: () => navigate(`/rulesheets/${id}`),
          }}
        />
      }
    >
      <Suspense fallback={<Loading />}>
        <PageWrapper id={id} resource={resource} t={t} navigate={navigate} />
      </Suspense>
    </ErrorBoundary>
  );
};
