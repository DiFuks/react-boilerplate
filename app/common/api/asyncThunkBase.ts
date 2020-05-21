import { createAsyncThunk } from '@reduxjs/toolkit';
import HttpStatusCodes from 'http-status-codes';

import { IResult } from '@app/common/api/response/IResponse';
import { IFetchResponse } from '@app/common/api/api';

export interface IAsyncError {
  error: string;
}

const getErrorText = (statusCode: number) => {
  if (statusCode === HttpStatusCodes.FORBIDDEN) {
    return 'Неверный логин или пароль';
  }

  return 'Произошла неизвестная ошибка';
};

export const asyncThunkBase = <RS, RQ = undefined>(
  prefix: string,
  method: (request: RQ) => Promise<IFetchResponse<RS>>,
) => (
    createAsyncThunk<IResult<RS>, RQ, { rejectValue: IAsyncError }>(prefix, async (request: RQ, thunkAPI) => {
      try {
        const response = await method(request);

        const data = await response.json();

        const action = data.result;

        if (response.status === HttpStatusCodes.OK || response.status === HttpStatusCodes.CREATED) {
          return action;
        }

        const errorAction: IAsyncError = {
          error: getErrorText(response.status),
        };

        return thunkAPI.rejectWithValue(errorAction);
      } catch (e) {
        const errorAction: IAsyncError = {
          error: 'Произошла неизвестная ошибка',
        };

        return thunkAPI.rejectWithValue(errorAction);
      }
    })
  );
