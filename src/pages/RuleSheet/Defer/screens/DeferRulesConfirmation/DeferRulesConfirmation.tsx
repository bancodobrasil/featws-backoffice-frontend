import { Button, Dialog, Divider, Grid, IconButton, Paper, Typography } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActionTypes, NotificationContext } from '../../../../../contexts/NotificationContext';
import { IRule, IRuleSheet } from '../../../../../interfaces';
import { EnumDeferRulesScreens } from '../../Defer';
import Style from './Style';

export interface IDeferRulesConfirmationProps {
  rulesheet: IRuleSheet;
  rules: IRule[];
  onBackClickHandler: (action?: () => void) => void;
  setCurrentScreen: (currentScreen: EnumDeferRulesScreens) => void;
}

export const DeferRulesConfirmation = ({
  rulesheet,
  rules,
  setCurrentScreen,
  onBackClickHandler,
}: IDeferRulesConfirmationProps) => {
  const navigate = useNavigate();

  const { dispatch } = useContext(NotificationContext);

  const [isDialogConfirmationOpen, setIsDialogConfirmationOpen] = useState<boolean>(false);
  const [isDialogTimeOpen, setIsDialogTimeOpen] = useState<boolean>(false);

  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  const classes = Style();

  const onBackAction = () => {
    setCurrentScreen(EnumDeferRulesScreens.LIST);
  };

  const _onBackClickHandler = () => {
    onBackClickHandler(onBackAction);
  };

  const handleOpenConfirmationDialog = () => {
    setIsDialogConfirmationOpen(true);
  };
  const handleOpenTimeDialog = () => {
    setIsDialogTimeOpen(true);
  };

  const handleCloseConfirmationDialog = () => {
    setIsDialogConfirmationOpen(false);
  };
  const handleCloseTimeDialog = () => {
    setIsDialogTimeOpen(false);
  };

  const handleConfirmationOk = () => {
    handleCloseConfirmationDialog();
    // TODO: Implement condition to open the time confirmation dialog, and verify with the team if it really will be used
    if (false) {
      handleOpenTimeDialog();
      return;
    }
    deferRules();
  };
  const handleTimeOk = () => {
    handleCloseTimeDialog();
    deferRules();
  };

  const deferRules = async () => {
    setLoadingSubmit(true);
    // TODO: Implement API request for defer rules
    try {
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          // const error = { status: 500, message: 'Internal Server Error' };
          // console.error(error.message, error);
          // reject(error);
          resolve();
        }, 2000);
      });
      dispatch({
        type: ActionTypes.OPEN_NOTIFICATION,
        message: `${rules.length === 1 ? 'Regra deferida' : 'Regras deferidas'} com sucesso!`,
      });
      navigate('../');
    } catch (error) {
      if (error.status) {
        const title = `Erro (status code: ${error.status})`;
        if (error.status === 500) {
          dispatch({
            type: ActionTypes.OPEN_NOTIFICATION,
            title,
            message:
              'Ocorreu uma falha interna no nosso servidor, por favor tente novamente mais tarde.',
            alertProps: { severity: 'error' },
          });
          return;
        }
        dispatch({
          type: ActionTypes.OPEN_NOTIFICATION,
          title,
          message:
            'Erro ao deferir Regra. Se o problema persistir, entre em contato com um administrador do sistema.',
          alertProps: { severity: 'error' },
        });
      }
      dispatch({
        type: ActionTypes.OPEN_NOTIFICATION,
        message: 'Erro ao deferir Regra.',
        alertProps: { severity: 'error' },
      });
    } finally {
      setLoadingSubmit(false);
    }
  };

  const renderRulesList = () => {
    return rules.map((rule, index) => {
      return (
        <div key={index} className={classes.containerRule}>
          <p className={classes.ruleField}>
            <span>Título:</span>
            <span>{rule.title}</span>
          </p>
          <p className={classes.ruleField}>
            <span>Folha de Regras:</span>
            <span>{rulesheet.name}</span>
          </p>
          <p className={classes.ruleField}>
            <span>Autor:</span>
            <span>{rule.author}</span>
          </p>
          <p className={classes.ruleField}>
            <span>Tag:</span>
            <span>R2D2</span>
          </p>
          <p className={classes.ruleField}>
            <span>Tipo de Regra:</span>
            <span>Exibição</span>
          </p>
          <div className={classes.containerRuleFilters}>
            <span>Filtros:</span>
            <div className={classes.containerRuleFiltersFields}>
              <span>MCI &gt; 1532</span>
              <span>Gênero: feminino</span>
              <span>Idade &gt; 24</span>
              <span>Idade &lt; 57</span>
              <span>Estado: Acre</span>
            </div>
          </div>
          {index < rules.length - 1 ? <Divider /> : null}
        </div>
      );
    });
  };

  const renderConfirmationDialog = () => {
    return (
      <Dialog
        onClose={handleCloseConfirmationDialog}
        aria-labelledby="confirmation-dialog-title"
        open={isDialogConfirmationOpen}
        className={classes.dialog}
      >
        <div id="confirmation-dialog-title" className={classes.dialogTitle}>
          <h3>Você tem certeza que quer deferir essa regra?</h3>
          <IconButton size="small" onClick={handleCloseConfirmationDialog}>
            <CancelIcon fontSize="small" />
          </IconButton>
        </div>
        <div className={classes.dialogContent}>
          Atenção, após confirmar, a regra será aplicada! Após ser deferida, você poderá deletar a
          regra se quiser.
        </div>
        <div className={classes.dialogActions}>
          <Button
            autoFocus
            onClick={handleCloseConfirmationDialog}
            color="secondary"
            variant="contained"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmationOk}
            color="primary"
            variant="contained"
            className={classes.dialogButtonConfirm}
          >
            Confirmar Deferimento
          </Button>
        </div>
      </Dialog>
    );
  };

  const renderTimeDialog = () => {
    return (
      <Dialog
        onClose={handleCloseTimeDialog}
        aria-labelledby="time-dialog-title"
        open={isDialogTimeOpen}
        className={classes.dialog}
      >
        <div id="time-dialog-title" className={classes.dialogTitle}>
          <h3>Você tem certeza que quer deferir nesse horário?</h3>
          <IconButton size="small" onClick={handleCloseTimeDialog}>
            <CancelIcon fontSize="small" />
          </IconButton>
        </div>
        <div className={classes.dialogContent}>
          Atenção! Deferir regras entre 9:00 - 15:30 pode gerar frutrações para os clientes.
        </div>
        <div className={classes.dialogActions}>
          <Button autoFocus onClick={handleCloseTimeDialog} color="secondary" variant="contained">
            Cancelar
          </Button>
          <Button
            onClick={handleTimeOk}
            color="primary"
            variant="contained"
            className={classes.dialogButtonConfirm}
          >
            Deferir mesmo assim
          </Button>
        </div>
      </Dialog>
    );
  };

  if (loadingSubmit) {
    return (
      <div className={classes.loadingSubmit}>
        <Typography variant="h2" component="p">
          Carregando deferimento de {rules.length === 1 ? 'Regra' : 'Regras'}...
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <Grid container>
        <Grid xs={4}>
          <Paper className={classes.paper}>
            <h1 className={classes.h1}>
              Confirme as informações {rules.length === 1 ? 'da regra' : 'das regras'}
            </h1>
            <Divider />
            {renderRulesList()}
            <Divider />
            <div className={classes.containerActionButtons}>
              <Button variant="contained" color="secondary" onClick={_onBackClickHandler}>
                Voltar
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.buttonDefer}
                onClick={handleOpenConfirmationDialog}
              >
                Deferir {rules.length <= 1 ? 'Regra' : 'Regras'}
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
      {renderConfirmationDialog()}
      {renderTimeDialog()}
    </div>
  );
};
