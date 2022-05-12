import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Divider, Paper, TextField, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import Style from './Style';
import ListButton from '../../../components/Buttons/ListButton';

export const EditRuleSheet = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [loadingRecord, setLoadingRecord] = useState<boolean>(false);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  const classes = Style();

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
    setName('apw');
    setLoadingRecord(false);
  }, [loadingRecord]);

  useEffect(() => {
    if (!name) {
      fetchRecord();
    }
  }, [name, fetchRecord]);

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

  const renderLoadingRecord = () => (
    <div className={classes.loadingRecord}>
      <Typography variant="h2" component="p">
        Carregando Folha de Regra...
      </Typography>
    </div>
  );

  const renderForm = () => (
    <Paper elevation={1}>
      <form className={classes.form} onSubmit={handleFormSubmit}>
        <div className={classes.inputContainer}>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            required
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
            }}
          />
        </div>
        <Divider />
        <div className={classes.actionButtonsContainer}>
          <Button variant="contained" color="primary" type="submit" disabled={loadingSubmit}>
            Edit
          </Button>
        </div>
      </form>
    </Paper>
  );

  return (
    <Box className={classes.root}>
      <div className={classes.headingContainer}>
        <h1>Edit Rule Sheet</h1>
        <div className={classes.headingButtonsContainer}>
          <ListButton label="Rule Sheets" />
        </div>
      </div>
      {loadingRecord ? renderLoadingRecord() : renderForm()}
    </Box>
  );
};
