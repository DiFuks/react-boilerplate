import { createAsyncThunk } from '@reduxjs/toolkit';
import HttpStatusCodes from 'http-status-codes';

import { IResponse } from '@app/common/api/response/IResponse';

export interface IAsyncAction<T> {
  data: T;
}

export interface IAsyncErrorAction {
  error: string;
}

const getErrorText = (statusCode: number) => {
  if (statusCode === HttpStatusCodes.FORBIDDEN) {
    return 'Неверный логин или пароль';
  }

  return 'Произошла неизвестная ошибка';
};

export const asyncThunkBase = <RQ, RS>(prefix: string, method: (request: RQ) => Promise<Response>) => (
  createAsyncThunk(prefix, async (request: RQ, thunkAPI) => {
    try {
      const response = await method(request);

      const data: IResponse<RS> = await response.json();

      const action: IAsyncAction<RS> = {
        data: data.result.data,
      };

      if (response.status === HttpStatusCodes.OK || response.status === HttpStatusCodes.CREATED) {
        return action;
      }

      const errorAction: IAsyncErrorAction = {
        error: getErrorText(response.status),
      };

      return thunkAPI.rejectWithValue(errorAction);
    } catch (e) {
      const errorAction: IAsyncErrorAction = {
        error: 'Произошла неизвестная ошибка',
      };

      return thunkAPI.rejectWithValue(errorAction);
    }
  })
);
