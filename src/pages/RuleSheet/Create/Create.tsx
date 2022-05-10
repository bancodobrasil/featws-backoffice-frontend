import React, { useState } from 'react';
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
import ListButton from '../../../components/Buttons/ListButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export const CreateRuleSheet = () => {
  const navigate = useNavigate();

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
    await new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
    setLoadingSubmit(false);
    navigate('../');
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
                        .replace(/^-+|-+$/g, '')
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
