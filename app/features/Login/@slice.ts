import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IRootState } from '@app/store';
import { api } from '@app/common/api/api';
import { asyncThunkBase, IAsyncErrorAction } from '@app/common/api/asyncThunkBase';

export const asyncActions = {
  login: asyncThunkBase('login/login', api.login),
};

export const { actions, reducer } = createSlice({
  name: 'login',
  initialState: {
    error: '',
    isProgress: false,
  },
  reducers: {
    resetError: state => {
      state.error = '';
    },
  },
  extraReducers: {
    [asyncActions.login.pending.type]: state => {
      state.isProgress = true;
    },
    [asyncActions.login.fulfilled.type]: state => {
      state.isProgress = false;
    },
    [asyncActions.login.rejected.type]: (state, action: PayloadAction<IAsyncErrorAction>) => {
      state.error = action.payload.error;
      state.isProgress = false;
    },
  },
});

export const selectors = {
  errorSelector: (state: IRootState) => state.loginForm.error,
  isProgressSelector: (state: IRootState) => state.loginForm.isProgress,
};
