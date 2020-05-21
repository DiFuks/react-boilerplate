import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

import { IFetchResponse } from '@app/common/api/api';
import { asyncThunkBase, IAsyncError } from '@app/common/api/asyncThunkBase';
import { FetchStatus } from '@app/common/enums/FetcStatus';
import { IResponse, IResult } from '@app/common/api/response/IResponse';
import { IPagination } from '@app/common/api/request/IPagination';
import { IPage } from '@app/common/interfaces/IPage';

export interface IParams<T> {
  name: string;
  fetchers: {
    read: (query?: IPagination) => Promise<IFetchResponse<IResponse<T[]>>>;
    update: (data: T) => Promise<IFetchResponse<IResponse<T>>>;
  };
}

export interface IState<T> {
  data: T[];
  fetchStatus: FetchStatus;
  error: string|null;
  page: IPage;
}

export const createCrudSlice = <T extends {}>({ name, fetchers }: IParams<T>) => {
  const asyncActions = {
    read: asyncThunkBase(`${name}/read`, fetchers.read),
    update: asyncThunkBase(`${name}/update`, fetchers.update),
  };

  const { actions, reducer } = createSlice({
    name: name,
    initialState: {
      data: [],
      fetchStatus: FetchStatus.NONE,
      error: '',
      page: {
        number: 0,
        count: 0,
        size: 0,
      },
    } as IState<T>,
    reducers: {},
    extraReducers: {
      [asyncActions.read.pending.type]: state => {
        state.fetchStatus = FetchStatus.IN_PROGRESS;
      },
      [asyncActions.read.fulfilled.type]: (state, action: PayloadAction<IResult<T[]>>) => {
        state.data = action.payload.data as Draft<T[]>;
        state.error = null;
        state.fetchStatus = FetchStatus.SUCCESS;
        state.page = {
          number: action.payload.pageNumber,
          count: action.payload.totalCount,
          size: action.payload.pageSize,
        };
      },
      [asyncActions.read.rejected.type]: (state, action: PayloadAction<IAsyncError>) => {
        state.fetchStatus = FetchStatus.FAILED;
        state.error = action.payload.error;
      },
      [asyncActions.update.pending.type]: state => {
        state.fetchStatus = FetchStatus.IN_PROGRESS;
      },
      [asyncActions.update.fulfilled.type]: state => {
        state.fetchStatus = FetchStatus.NONE;
      },
      [asyncActions.update.rejected.type]: (state, action: PayloadAction<IAsyncError>) => {
        state.fetchStatus = FetchStatus.FAILED;
        state.error = action.payload.error;
      },
    },
  });

  return {
    asyncActions,
    reducer,
    actions,
  };
};
