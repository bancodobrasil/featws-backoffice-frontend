import React, { useContext, useState } from 'react';
import {
  Box,
  Breadcrumbs,
  Button,
  Divider,
  Grid,
  IconButton,
  Link,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import Style from './Style';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { ActionTypes, NotificationContext } from '../../../contexts/NotificationContext';

export const CreateRuleSheet = () => {
  const navigate = useNavigate();

  const { dispatch } = useContext(NotificationContext);

  const [name, setName] = useState<string>('');
  const [slug, setSlug] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  const classes = Style();

  const onBackClickHandler = () => {
    navigate('/');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLoadingSubmit(true);
    // TODO: Implement the API request.
    // The Promise below simulates the loading time of the request, remove it when you implement the request itself.
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
        message: 'Folha de Regras criada com sucesso!',
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
            'Erro ao criar Folha de Regra. Se o problema persistir, entre em contato com um administrador do sistema.',
          alertProps: { severity: 'error' },
        });
      }
      dispatch({
        type: ActionTypes.OPEN_NOTIFICATION,
        message: 'Erro ao criar Folha de Regra.',
        alertProps: { severity: 'error' },
      });
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <Box className={classes.root}>
      <div className={classes.breadcrumbsContainer}>
        <IconButton onClick={onBackClickHandler} size="small">
          <ArrowBackIcon fontSize="small" color="primary" />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
          <Link color="textPrimary" component={RouterLink} to="/">
            FeatWS
          </Link>
          <span className={classes.breadcrumbsSeparator + ' last'}>/</span>
          <Typography component="span" className={classes.breadcrumbActive}>
            Deferimento
          </Typography>
        </Breadcrumbs>
      </div>
      <Grid container className={classes.gridContainer}>
        <Grid xs={5}>
          <Paper elevation={1}>
            <h1 className={classes.h1}>Criar Nova Folha de Regras</h1>
            <Divider />
            <form className={classes.form} onSubmit={handleFormSubmit}>
              <div className={classes.inputContainer}>
                <TextField
                  id="name"
                  label="Nome da Folha de Regras"
                  placeholder="Defina um nome"
                  fullWidth
                  required
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const { value } = e.target;
                    setName(value);
                    setSlug(
                      value
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .replace(/[^a-zA-Z0-9 ]/g, '')
                        .trim()
                        .replace(/[^\w\s-]/g, '')
                        .replace(/[\s_-]+/g, '-')
                        .replace(/^-+|-+$/g, ''),
                    );
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className={classes.inputContainer}>
                <TextField
                  id="slug"
                  label="Slug da Folha de Regras"
                  placeholder="slug-da-folha-de-regras"
                  fullWidth
                  required
                  value={slug}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSlug(e.target.value.toLowerCase().split(' ').join('-'));
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className={classes.inputContainer}>
                <TextField
                  id="description"
                  label="Descrição (opcional)"
                  placeholder="Digite sua descrição..."
                  fullWidth
                  helperText={`${500 - description.length} caracteres restantes`}
                  multiline
                  rows={3}
                  value={description}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setDescription(e.target.value);
                  }}
                  inputProps={{ maxLength: 500 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className={classes.actionContainer}>
                <div className={classes.actionDividerContainer}>
                  <Divider />
                </div>
                <div className={classes.actionButtonsContainer}>
                  <Button
                    variant="contained"
                    color="secondary"
                    disabled={loadingSubmit}
                    onClick={onBackClickHandler}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={loadingSubmit}
                    className={classes.buttonSubmit}
                  >
                    Criar Folha de Regras
                  </Button>
                </div>
              </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
