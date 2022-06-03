/* eslint-disable no-underscore-dangle */
import React, { useContext, useState } from 'react';
import { Box, Button, Paper, styled, TextField, Typography } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ActionTypes,
  NotificationContext,
  openDefaultErrorNotification,
} from '../../../contexts/NotificationContext';
import { AppBreadcrumbs } from '../../../components/AppBreadcrumbs';
import { IRuleSheet } from '../../../interfaces';
import AuthorizedComponent from '../../../components/Auth/AuthorizedComponent';

const NAME_MIN_LENGTH = 3;
const NAME_MAX_LENGTH = 30;
const URL_MIN_LENGTH = 3;

const Form = styled('form')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
});

const InputContainer = styled('div')({
  flex: 1,
  maxWidth: '532px',
  '& .MuiInputLabel-shrink': {
    fontSize: 16,
  },
});

interface NavigationState {
  rulesheet: IRuleSheet;
}

export const CreateRule = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const { rulesheet } = location.state as NavigationState;

  const { dispatch } = useContext(NotificationContext);

  const [name, setName] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');

  const [defaultURL, setDefaultURL] = useState<string>('');
  const [defaultURLError, setDefaultURLError] = useState<string>('');

  const [redirectURL, setRedirectURL] = useState<string>('');
  const [redirectURLError, setRedirectURLError] = useState<string>('');

  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  const onBackClickHandler = () => {
    navigate('/');
  };

  const isValidName = (name: string): boolean => {
    let _nameError = '';
    if (name.length < NAME_MIN_LENGTH) {
      _nameError = t('form.validation.min', {
        field: t('rulesheet.fields.name'),
        min: NAME_MIN_LENGTH,
      });
    } else if (name.length > NAME_MAX_LENGTH) {
      _nameError = t('form.validation.max', {
        field: t('rulesheet.fields.name'),
        max: NAME_MAX_LENGTH,
      });
    }
    if (_nameError) {
      setNameError(_nameError);
      return false;
    }
    setNameError('');
    return true;
  };

  const isValidURL = (url: string, setErrorMethod: (error: string) => void): boolean => {
    let _urlError = '';
    if (url.length < URL_MIN_LENGTH) {
      _urlError = t('form.validation.min', {
        field: 'URL',
        min: URL_MIN_LENGTH,
      });
    }
    if (_urlError) {
      setErrorMethod(_urlError);
      return false;
    }
    setErrorMethod('');
    return true;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);
    isValidName(value);
  };

  const handleDefaultURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDefaultURL(value);
    isValidURL(value, setDefaultURLError);
  };

  const handleRedirectURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setRedirectURL(value);
    isValidURL(value, setRedirectURLError);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isValidName(name)) {
      return;
    }

    setLoadingSubmit(true);
    // TODO: Implement the API request.
    // The Promise below simulates the loading time of the request, remove it when you implement the request itself.
    try {
      // await createRuleSheet({ name });
      dispatch({
        type: ActionTypes.OPEN_NOTIFICATION,
        message: `${t('notification.createSuccess', {
          resource: t('rulesheet.name'),
          context: 'female',
        })}!`,
      });
      navigate('../');
    } catch (error) {
      openDefaultErrorNotification(error, dispatch);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        paddingTop: '16px',
        paddingBottom: '16px',
      }}
    >
      <AppBreadcrumbs
        items={[
          { label: 'FeatWS', navigateTo: '/' },
          { label: rulesheet.name, navigateTo: `/rulesheets/${id}` },
          { label: t('rule.new') },
        ]}
        onBack={onBackClickHandler}
      />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 700,
            fontSize: '36px',
            lineHeight: '24px',
            letterSpacing: '0.18px',
            m: 0,
            py: '16px',
          }}
        >
          {t('rule.titles.create')}
        </Typography>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button variant="text" disabled={loadingSubmit} onClick={onBackClickHandler}>
            {t('buttons.cancel')}
          </Button>
          <Button variant="outlined" disabled={loadingSubmit} sx={{ mx: '8px' }}>
            {t('rule.buttons.saveDraft')}
          </Button>
          <AuthorizedComponent permissions={['admin']}>
            <Button variant="contained" disabled={loadingSubmit} color="primary">
              {t('rule.buttons.sendCreateRequest')}
            </Button>
          </AuthorizedComponent>
        </Box>
      </Box>
      <Typography
        variant="h2"
        sx={{
          color: '#6C7077',
          fontWeight: 500,
          fontSize: '24px',
          lineHeight: '24px',
          letterSpacing: '0.18px',
          m: 0,
          pb: '42px',
        }}
      >
        {rulesheet.name}
      </Typography>
      <Form onSubmit={handleFormSubmit}>
        <InputContainer>
          <TextField
            id="name"
            label={t('rule.of', { field: 'title' })}
            placeholder={t('rule.placeholders.name')}
            fullWidth
            required
            value={name}
            onChange={handleNameChange}
            inputProps={{
              maxLength: NAME_MAX_LENGTH,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            error={!!nameError}
            helperText={nameError}
          />
        </InputContainer>
        <Box sx={{ display: 'flex', flex: 1, mt: '24px' }}>
          <InputContainer sx={{ mr: '16px' }}>
            <TextField
              id="defaultURL"
              label={t('rule.fields.meta.defaultURL')}
              placeholder={t('rule.placeholders.meta.defaultURL')}
              fullWidth
              required
              value={defaultURL}
              onChange={handleDefaultURLChange}
              InputLabelProps={{
                shrink: true,
              }}
              error={!!defaultURLError}
              helperText={defaultURLError}
            />
          </InputContainer>
          <InputContainer>
            <TextField
              id="redirectURL"
              label={t('rule.fields.meta.redirectURL')}
              placeholder={t('rule.placeholders.meta.redirectURL')}
              fullWidth
              required
              value={redirectURL}
              onChange={handleRedirectURLChange}
              InputLabelProps={{
                shrink: true,
              }}
              error={!!redirectURLError}
              helperText={redirectURLError}
            />
          </InputContainer>
        </Box>

        <Paper elevation={1} />
      </Form>
    </Box>
  );
};
