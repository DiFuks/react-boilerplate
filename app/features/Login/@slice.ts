import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IRootState } from '@app/store';
import { api } from '@app/common/api/api';
import { asyncThunkBase, IAsyncError } from '@app/common/api/asyncThunkBase';
import { IToken } from '@app/common/api/response/IToken';
import { IResult } from '@app/common/api/response/IResponse';

export const asyncActions = {
  login: asyncThunkBase('login/login', api.login),
};

export const { actions, reducer } = createSlice({
  name: 'login',
  initialState: {
    error: '',
    token: '',
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
    [asyncActions.login.fulfilled.type]: (state, action: PayloadAction<IResult<IToken>>) => {
      state.token = action.payload.data.token;
      state.isProgress = false;
    },
    [asyncActions.login.rejected.type]: (state, action: PayloadAction<IAsyncError>) => {
      state.error = action.payload.error;
      state.isProgress = false;
    },
  },
});

export const selectors = {
  errorSelector: (state: IRootState) => state.loginForm.error,
  isProgressSelector: (state: IRootState) => state.loginForm.isProgress,
  tokenSelector: (state: IRootState) => state.loginForm.token,
};
