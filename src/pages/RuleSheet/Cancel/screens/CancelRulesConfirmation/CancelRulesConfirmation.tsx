import {
  Box,
  Button,
  Dialog,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
  styled,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ActionTypes,
  NotificationContext,
  openDefaultErrorNotification,
} from '../../../../../contexts/NotificationContext';
import { IRule, IRuleSheet } from '../../../../../interfaces';
import { EnumCancelRulesScreens } from '../../Cancel';
import Loading from '../../../../../components/Loading';
import { cancelRules } from '../../../../../api/services/RuleSheets';

export interface ICancelRulesConfirmationProps {
  rulesheet: IRuleSheet;
  rules: IRule[];
  onBackClickHandler: (action?: () => void) => void;
  setCurrentScreen: (currentScreen: EnumCancelRulesScreens) => void;
}

const RuleField = styled('div')({
  margin: 0,
  paddingTop: 16,
  '& span': {
    fontSize: 16,
  },
  '& span:first-child': {
    fontWeight: 700,
    marginRight: 8,
  },
});

export const CancelRulesConfirmation = ({
  rulesheet,
  rules,
  setCurrentScreen,
  onBackClickHandler,
}: ICancelRulesConfirmationProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { dispatch } = useContext(NotificationContext);

  const [isDialogConfirmationOpen, setIsDialogConfirmationOpen] = useState<boolean>(false);

  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  const onBackAction = () => {
    setCurrentScreen(EnumCancelRulesScreens.LIST);
  };

  const onBackClickHandlerOverride = () => {
    onBackClickHandler(onBackAction);
  };

  const handleOpenConfirmationDialog = () => {
    setIsDialogConfirmationOpen(true);
  };

  const handleCloseConfirmationDialog = () => {
    setIsDialogConfirmationOpen(false);
  };

  const handleConfirmationOk = () => {
    handleCloseConfirmationDialog();
    callCancelRules();
  };

  const callCancelRules = async () => {
    setLoadingSubmit(true);
    try {
      await cancelRules(rules);
      dispatch({
        type: ActionTypes.OPEN_NOTIFICATION,
        message: `${t('rulesheet.messages.cancel.success')}!`,
      });
      navigate('../');
    } catch (error) {
      openDefaultErrorNotification(error, dispatch);
    } finally {
      setLoadingSubmit(false);
    }
  };

  const renderRulesList = () =>
    rules.map((rule, index) => (
      <Box
        key={index}
        sx={{
          marginLeft: '16px',
          marginRight: '16px',
        }}
      >
        <RuleField>
          <span>{t('rule.fields.title')}:</span>
          <span>{rule.title}</span>
        </RuleField>
        <RuleField>
          <span>{t('rulesheet.name')}:</span>
          <span>{rulesheet.name}</span>
        </RuleField>
        <RuleField>
          <span>{t('rule.fields.author')}:</span>
          <span>{rule.author}</span>
        </RuleField>
        <RuleField>
          <span>{t('rule.fields.tag')}:</span>
          <span>R2D2</span>
        </RuleField>
        <RuleField>
          <span>{t('rule.fields.type.name')}:</span>
          <span>{t('rule.fields.type.display')}</span>
        </RuleField>
        <Box
          sx={{
            paddingTop: '16px',
            paddingBottom: '16px',
            display: 'flex',
            '& > span': {
              fontWeight: 700,
              fontSize: 16,
              marginRight: '8px',
            },
          }}
        >
          <span>{t('rule.fields.filters')}:</span>
          <Box
            sx={{
              '& span': {
                fontSize: 16,
                display: 'list-item',
                listStyleType: 'disc',
                listStylePosition: 'inside',
              },
            }}
          >
            <span>MCI &gt; 1532</span>
            <span>Gênero: feminino</span>
            <span>Idade &gt; 24</span>
            <span>Idade &lt; 57</span>
            <span>Estado: Acre</span>
          </Box>
        </Box>
        {index < rules.length - 1 ? <Divider /> : null}
      </Box>
    ));

  const renderConfirmationDialog = () => (
    <Dialog
      onClose={handleCloseConfirmationDialog}
      aria-labelledby="confirmation-dialog-title"
      open={isDialogConfirmationOpen}
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
        <h3>{t('rulesheet.dialogs.cancel.confirmation.title')}</h3>
        <IconButton size="small" onClick={handleCloseConfirmationDialog} sx={{ ml: '16px' }}>
          <CancelIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box
        sx={{
          marginTop: '16px',
          marginBottom: '32px',
          fontSize: 16,
        }}
      >
        {t('rulesheet.dialogs.cancel.confirmation.message')}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          autoFocus
          onClick={handleCloseConfirmationDialog}
          color="secondary"
          variant="contained"
        >
          {t('buttons.cancel')}
        </Button>
        <Button
          onClick={handleConfirmationOk}
          color="primary"
          variant="contained"
          sx={{
            marginLeft: '16px',
          }}
        >
          {t('rulesheet.buttons.confirmCancel')}
        </Button>
      </Box>
    </Dialog>
  );

  if (loadingSubmit) {
    return <Loading />;
  }

  return (
    <div>
      <Grid container>
        <Grid xs={4}>
          <Paper
            sx={{
              marginTop: '11px',
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
                padding: '16px',
              }}
            >
              {t('rulesheet.titles.defer.confirmation', { count: rules.length })}
            </Typography>
            <Divider />
            {renderRulesList()}
            <Divider />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                padding: '16px',
              }}
            >
              <Button variant="contained" color="secondary" onClick={onBackClickHandlerOverride}>
                {t('buttons.back')}
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  marginLeft: '16px',
                }}
                onClick={handleOpenConfirmationDialog}
              >
                {t('rulesheet.buttons.requestCancellation')}
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {renderConfirmationDialog()}
    </div>
  );
};
