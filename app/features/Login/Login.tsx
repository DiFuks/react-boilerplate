import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { TextField } from 'mui-rff';
import { useDispatch, useSelector } from 'react-redux';

import { MainForm } from '@app/common/components/MainForm';
import { asyncActions, selectors, actions } from '@app/features/Login/@slice';
import { auth } from '@app/common/utils/auth';

export const Login: React.FC = () => {
  const dispatch = useDispatch();

  const error = useSelector(selectors.errorSelector);
  const isProgress = useSelector(selectors.isProgressSelector);
  const token = useSelector(selectors.tokenSelector);

  useEffect(() => {
    if (token) {
      auth.login(token);
    }
  }, [token]);

  return (
    <MainForm
      title='Вход'
      onSubmit={data => dispatch(asyncActions.login(data))}
      initialValues={{
        login: '',
        password: '',
      }}
      actions={(
        <Button
          color='primary'
          type='submit'
          disabled={isProgress}
        >
          Войти
        </Button>
      )}
    >
      {error && (
        <Alert
          severity='error'
          onClose={() => dispatch(actions.resetError())}
        >
          {error}
        </Alert>
      )}
      <TextField
        name='login'
        label='Логин'
        required={true}
      />
      <TextField
        name='password'
        label='Пароль'
        type='password'
        required={true}
      />
    </MainForm>
  );
};
