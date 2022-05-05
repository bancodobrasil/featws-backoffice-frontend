import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import React, { useState } from 'react';
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
  const [isDialogConfirmationOpen, setIsDialogConfirmationOpen] = useState<boolean>(false);

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

  const deferRules = () => {
    // TODO: Implement API request for defer rules
  };

  const handleCloseConfirmationDialog = () => {
    setIsDialogConfirmationOpen(false);
    // TODO: Implement condition to open the time confirmation dialog
    deferRules();
  };

  const handleConfirmationOk = () => {
    handleCloseConfirmationDialog();
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

  return (
    <div>
      <Grid container>
        <Grid xs={4}>
          <Paper className={classes.paper}>
            <h1 className={classes.h1}>Confirme as informações da regra</h1>
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
          <Button onClick={handleConfirmationOk} color="primary" variant="contained" className={classes.dialogButtonConfirm}>
            Confirmar Deferimento
          </Button>
        </div>
      </Dialog>
    </div>
  );
};
