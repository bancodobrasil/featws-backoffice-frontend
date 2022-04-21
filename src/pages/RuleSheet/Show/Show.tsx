import React, { useEffect, useState } from 'react';
import { Box, Button, Divider, Paper, Typography } from '@material-ui/core';
import Style from './Style';
import { useNavigate, useParams } from 'react-router-dom';
import ListButton from '../../../components/Buttons/ListButton';
import { withStyles } from '@material-ui/styles';
import { red } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { IRuleSheet } from '../../../interfaces';

const DeleteButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
}))(Button);

export const ShowRuleSheet = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [record, setRecord] = useState<IRuleSheet | undefined>();
  const [loadingRecord, setLoadingRecord] = useState<boolean>(false);

  const classes = Style();

  const fetchRecord = async () => {
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
    setRecord({ id, name: 'apw' });
    setLoadingRecord(false);
  };

  useEffect(() => {
    fetchRecord();
  }, []);

  const handleEditButtonOnClick = () => {
    navigate(`/rulesheets/edit/${id}`);
  };

  const handleDeleteButtonOnClick = () => {
    const confirmed = confirm('Confirm delete Rule Sheet?');
    if (confirmed) {
      // TODO: Implement API request.
      navigate('..');
    }
  };

  const renderLoadingRecord = () => {
    return (
      <div className={classes.loadingRecord}>
        <Typography variant="h2" component="p">
          Loading...
        </Typography>
      </div>
    );
  };

  const renderFields = () => {
    return (
      <Paper elevation={1} className={classes.fieldsContainer}>
        <div className={classes.field}>
          <span className={classes.fieldLabel}>ID:</span>
          <span className={classes.fieldValue}>{record?.id}</span>
        </div>
        <div className={classes.field}> 
          <span className={classes.fieldLabel}>Name:</span>
          <span className={classes.fieldValue}>{record?.name}</span>
        </div>
        <Divider />
        <div className={classes.actionButtonsContainer}>
          <Button variant="contained" color="primary" onClick={handleEditButtonOnClick}>
            <EditIcon fontSize="small" />
            <span style={{ marginLeft: 4 }}>Edit</span>
          </Button>
          <DeleteButton
            variant="contained"
            style={{ marginLeft: 8 }}
            onClick={handleDeleteButtonOnClick}
          >
            <DeleteIcon fontSize="small" />
            <span style={{ marginLeft: 4 }}>Delete</span>
          </DeleteButton>
        </div>
      </Paper>
    );
  };

  return (
    <Box className={classes.root}>
      <div className={classes.headingContainer}>
        <h1>Edit Rule Sheet</h1>
        <div className={classes.headingButtonsContainer}>
          <ListButton label="Rule Sheets" />
        </div>
      </div>
      {loadingRecord ? renderLoadingRecord() : renderFields()}
    </Box>
  );
};
