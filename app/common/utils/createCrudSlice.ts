import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

import { IFetchResponse } from '@app/common/api/api';
import { asyncThunkBase, IAsyncError } from '@app/common/api/asyncThunkBase';
import { FetchStatus } from '@app/common/enums/FetcStatus';
import { IResponse, IResult } from '@app/common/api/response/IResponse';
import { IPagination } from '@app/common/api/request/IPagination';
import { IPage } from '@app/common/interfaces/IPage';
import { RecursivePartial } from '@app/common/utils/recursivePartial';

export interface IParams<T> {
  name: string;
  fetchers: {
    read: (query?: IPagination) => Promise<IFetchResponse<IResponse<T[]>>>;
    update: (data: T) => Promise<IFetchResponse<IResponse<T>>>;
    create: (data: RecursivePartial<T>) => Promise<IFetchResponse<IResponse<T>>>;
  };
}

export interface IState<T> {
  data: T[];
  fetchStatus: FetchStatus;
  error: string | null;
  page: IPage;
  updateCurrent: T | null;
  createCurrent: RecursivePartial<T> | null;
}

export const createCrudSlice = <T extends {}>({ name, fetchers }: IParams<T>) => {
  const asyncActions = {
    read: asyncThunkBase(`${name}/read`, fetchers.read),
    update: asyncThunkBase(`${name}/update`, fetchers.update),
    create: asyncThunkBase(`${name}/create`, fetchers.create),
  };

  const { actions, reducer } = createSlice({
    name: name,
    initialState: {
      data: [],
      fetchStatus: FetchStatus.NONE,
      error: null,
      page: {
        number: 0,
        count: 0,
        size: 0,
      },
      updateCurrent: null,
      createCurrent: null,
    } as IState<T>,
    reducers: {
      resetError: state => {
        state.fetchStatus = FetchStatus.FAILED_CONFIRM;
      },
      openUpdate: (state, action: PayloadAction<T>) => {
        state.updateCurrent = action.payload as Draft<T>;
      },
      resetUpdate: state => {
        state.updateCurrent = null;
      },
      openCreate: (state, action: PayloadAction<RecursivePartial<T>>) => {
        state.createCurrent = action.payload as Draft<RecursivePartial<T>>;
      },
      resetCreate: state => {
        state.createCurrent = null;
      },
    },
    extraReducers: {
      [asyncActions.read.pending.type]: state => {
        state.fetchStatus = FetchStatus.IN_PROGRESS;
      },
      [asyncActions.read.fulfilled.type]: (state, action: PayloadAction<IResult<T[]>>) => {
        state.data = action.payload.data as Draft<T[]>;
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
        state.fetchStatus = FetchStatus.SUCCESS;
        state.updateCurrent = null;
      },
      [asyncActions.update.rejected.type]: (state, action: PayloadAction<IAsyncError>) => {
        state.fetchStatus = FetchStatus.FAILED;
        state.error = action.payload.error;
      },
      [asyncActions.create.pending.type]: state => {
        state.fetchStatus = FetchStatus.IN_PROGRESS;
      },
      [asyncActions.create.fulfilled.type]: state => {
        state.fetchStatus = FetchStatus.SUCCESS;
        state.updateCurrent = null;
      },
      [asyncActions.create.rejected.type]: (state, action: PayloadAction<IAsyncError>) => {
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
