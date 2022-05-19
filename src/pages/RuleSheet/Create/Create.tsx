/* eslint-disable no-underscore-dangle */
import React, { useContext, useState } from 'react';
import { Box, Button, Divider, Grid, Paper, styled, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ActionTypes, NotificationContext } from '../../../contexts/NotificationContext';
import { AppBreadcrumbs } from '../../../components/AppBreadcrumbs';
import { createRuleSheet } from '../../../api/services/RuleSheets';

const NAME_MIN_LENGTH = 3;
const NAME_MAX_LENGTH = 30;
const SLUG_MIN_LENGTH = 3;
const SLUG_MAX_LENGTH = 30;

const Form = styled('form')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
});

const InputContainer = styled('div')({
  marginTop: 25,
  marginLeft: 16,
  marginRight: 16,
  '& .MuiInputLabel-shrink': {
    fontSize: 16,
  },
});

export const CreateRuleSheet = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { dispatch } = useContext(NotificationContext);

  const [name, setName] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');

  const [slug, setSlug] = useState<string>('');
  const [slugError, setSlugError] = useState<string>('');

  const [description, setDescription] = useState<string>('');

  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  const onBackClickHandler = () => {
    navigate('/');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    let _nameError = '';
    let _slugError = '';
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
    if (slug.length < SLUG_MIN_LENGTH) {
      _slugError = t('form.validation.min', {
        field: t('rulesheet.fields.slug'),
        min: SLUG_MIN_LENGTH,
      });
    } else if (slug.length > SLUG_MAX_LENGTH) {
      _slugError = t('form.validation.max', {
        field: t('rulesheet.fields.slug'),
        min: SLUG_MAX_LENGTH,
      });
    }
    if (!!_nameError || !!_slugError) {
      setNameError(_nameError);
      setSlugError(_slugError);
      return;
    }

    setLoadingSubmit(true);
    // TODO: Implement the API request.
    // The Promise below simulates the loading time of the request, remove it when you implement the request itself.
    try {
      await createRuleSheet({ name, slug });
      dispatch({
        type: ActionTypes.OPEN_NOTIFICATION,
        message: `${t('notification.createSuccess', {
          resource: t('rulesheet.name'),
          context: 'female',
        })}!`,
      });
      navigate('../');
    } catch (error) {
      dispatch({ type: ActionTypes.OPEN_ERROR_NOTIFICATION, error });
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
        items={[{ label: 'FeatWS', navigateTo: '/' }, { label: t('rulesheet.new') }]}
        onBack={onBackClickHandler}
      />
      <Grid
        container
        sx={{
          paddingTop: '11px',
          height: '100%',
          '& .featws-ui-MuiPaper-root': {
            height: '90%',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <Grid xs={5}>
          <Paper elevation={1}>
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
              {t('rulesheet.titles.create')}
            </Typography>
            <Divider />
            <Form onSubmit={handleFormSubmit}>
              <InputContainer>
                <TextField
                  id="name"
                  label={t('rulesheet.of', { field: 'name' })}
                  placeholder={t('rulesheet.placeholders.name')}
                  fullWidth
                  required
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const { value } = e.target;
                    setNameError('');
                    setSlugError('');
                    setName(value);
                    setSlug(
                      value
                        .toLowerCase()
                        .normalize('NFKD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .replace(/[^a-zA-Z0-9 ]/g, '')
                        .replace(/[^\w\s-]/g, '')
                        .replace(/[\s_-]+/g, '-')
                        .replace(/^-+|-+$/g, '')
                        .trim(),
                    );
                  }}
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
              <InputContainer>
                <TextField
                  id="slug"
                  label={t('rulesheet.of', { field: 'slug' })}
                  placeholder={t('rulesheet.placeholders.slug')}
                  fullWidth
                  required
                  value={slug}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSlugError('');
                    setSlug(
                      e.target.value
                        .toLowerCase()
                        .normalize('NFKD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .replace(/[^a-zA-Z0-9-]/g, '')
                        .replace(/[^\w\s-]/g, '')
                        .replace(/[\s_-]+/g, '-')
                        .replace(/^-+|-+$/g, '')
                        .trim(),
                    );
                  }}
                  inputProps={{
                    maxLength: SLUG_MAX_LENGTH,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!slugError}
                  helperText={slugError}
                />
              </InputContainer>
              <InputContainer>
                <TextField
                  id="description"
                  label={t('form.optional', { field: t('rulesheet.fields.description') })}
                  placeholder={t('rulesheet.placeholders.description')}
                  fullWidth
                  helperText={t('form.helperText.charactersLeft', {
                    count: 500 - description.length,
                  })}
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
              </InputContainer>
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '16px',
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'flex-end',
                    '& .MuiDivider-root': {
                      flex: 1,
                    },
                  }}
                >
                  <Divider />
                </Box>
                <Box
                  sx={{
                    margin: '16px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    disabled={loadingSubmit}
                    onClick={onBackClickHandler}
                  >
                    {t('buttons.cancel')}
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={loadingSubmit}
                    sx={{
                      marginLeft: '16px',
                    }}
                  >
                    {t('rulesheet.titles.create')}
                  </Button>
                </Box>
              </Box>
            </Form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
