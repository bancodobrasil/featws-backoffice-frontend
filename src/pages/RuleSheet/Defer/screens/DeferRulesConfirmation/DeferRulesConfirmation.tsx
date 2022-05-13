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
import { ActionTypes, NotificationContext } from '../../../../../contexts/NotificationContext';
import { IRule, IRuleSheet } from '../../../../../interfaces';
import { EnumDeferRulesScreens } from '../../Defer';

export interface IDeferRulesConfirmationProps {
  rulesheet: IRuleSheet;
  rules: IRule[];
  onBackClickHandler: (action?: () => void) => void;
  setCurrentScreen: (currentScreen: EnumDeferRulesScreens) => void;
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

  const onBackAction = () => {
    setCurrentScreen(EnumDeferRulesScreens.LIST);
  };

  const onBackClickHandlerOverride = () => {
    onBackClickHandler(onBackAction);
  };

  const handleOpenConfirmationDialog = () => {
    setIsDialogConfirmationOpen(true);
  };
  // const handleOpenTimeDialog = () => {
  //   setIsDialogTimeOpen(true);
  // };

  const handleCloseConfirmationDialog = () => {
    setIsDialogConfirmationOpen(false);
  };
  const handleCloseTimeDialog = () => {
    setIsDialogTimeOpen(false);
  };

  const handleConfirmationOk = () => {
    handleCloseConfirmationDialog();
    // TODO: Implement condition to open the time confirmation dialog, and verify with the team if it really will be used
    // if (true) {
    //   handleOpenTimeDialog();
    //   return;
    // }
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
          <span>Título:</span>
          <span>{rule.title}</span>
        </RuleField>
        <RuleField>
          <span>Folha de Regras:</span>
          <span>{rulesheet.name}</span>
        </RuleField>
        <RuleField>
          <span>Autor:</span>
          <span>{rule.author}</span>
        </RuleField>
        <RuleField>
          <span>Tag:</span>
          <span>R2D2</span>
        </RuleField>
        <RuleField>
          <span>Tipo de Regra:</span>
          <span>Exibição</span>
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
          <span>Filtros:</span>
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
        <h3>Você tem certeza que quer deferir essa regra?</h3>
        <IconButton size="small" onClick={handleCloseConfirmationDialog}>
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
        Atenção, após confirmar, a regra será aplicada! Após ser deferida, você poderá deletar a
        regra se quiser.
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
          Cancelar
        </Button>
        <Button
          onClick={handleConfirmationOk}
          color="primary"
          variant="contained"
          sx={{
            marginLeft: '16px',
          }}
        >
          Confirmar Deferimento
        </Button>
      </Box>
    </Dialog>
  );

  const renderTimeDialog = () => (
    <Dialog
      onClose={handleCloseTimeDialog}
      aria-labelledby="time-dialog-title"
      open={isDialogTimeOpen}
      sx={{
        '& .MuiDialog-paper': {
          padding: '16px',
        },
      }}
    >
      <Box
        id="time-dialog-title"
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
        <h3>Você tem certeza que quer deferir nesse horário?</h3>
        <IconButton size="small" onClick={handleCloseTimeDialog}>
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
        Atenção! Deferir regras entre 9:00 - 15:30 pode gerar frutrações para os clientes.
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button autoFocus onClick={handleCloseTimeDialog} color="secondary" variant="contained">
          Cancelar
        </Button>
        <Button
          onClick={handleTimeOk}
          color="primary"
          variant="contained"
          sx={{
            marginLeft: '16px',
          }}
        >
          Deferir mesmo assim
        </Button>
      </Box>
    </Dialog>
  );

  if (loadingSubmit) {
    return (
      <Box
        sx={{
          marginTop: '24px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h2" component="p">
          Carregando deferimento de {rules.length === 1 ? 'Regra' : 'Regras'}...
        </Typography>
      </Box>
    );
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
              Confirme as informações {rules.length === 1 ? 'da regra' : 'das regras'}
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
                Voltar
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  marginLeft: 16,
                }}
                onClick={handleOpenConfirmationDialog}
              >
                Deferir {rules.length <= 1 ? 'Regra' : 'Regras'}
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {renderConfirmationDialog()}
      {renderTimeDialog()}
    </div>
  );
};
