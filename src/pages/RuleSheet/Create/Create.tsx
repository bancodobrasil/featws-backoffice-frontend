import React, { useState } from 'react';
import { Box, Button, Divider, Paper, TextField } from '@material-ui/core';
import Style from './Style';
import { useNavigate } from 'react-router-dom';
import ListButton from '../../../components/Buttons/ListButton';

export const CreateRuleSheet = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  const classes = Style();

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
      <div className={classes.headingContainer}>
        <h1>Create Rule Sheet</h1>
        <div className={classes.headingButtonsContainer}>
          <ListButton label="Rule Sheets" />
        </div>
      </div>
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
              Create
            </Button>
          </div>
        </form>
      </Paper>
    </Box>
  );
};
