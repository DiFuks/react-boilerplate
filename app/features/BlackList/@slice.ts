import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IRootState } from '@app/store';
import { api } from '@app/common/api/api';
import { asyncThunkBase, IAsyncError } from '@app/common/api/asyncThunkBase';
import { FetchStatus } from '@app/common/enums/FetcStatus';
import { IBlackList } from '@app/common/api/response/IBlackList';
import { IResult } from '@app/common/api/response/IResponse';
import { IPage } from '@app/common/interfaces/IPage';

export const asyncActions = {
  read: asyncThunkBase('blackList/read', api.blackList.read),
  update: asyncThunkBase('blackList/update', api.blackList.update),
};

export interface IState {
  data: IBlackList[];
  fetchStatus: FetchStatus;
  error: string|null;
  page: IPage;
}

export const { reducer } = createSlice({
  name: 'blackList',
  initialState: {
    data: [],
    fetchStatus: FetchStatus.NONE,
    error: '',
    page: {
      number: 0,
      count: 0,
      size: 0,
    },
  } as IState,
  reducers: {},
  extraReducers: {
    [asyncActions.read.pending.type]: state => {
      state.fetchStatus = FetchStatus.IN_PROGRESS;
    },
    [asyncActions.read.fulfilled.type]: (state, action: PayloadAction<IResult<IBlackList[]>>) => {
      state.data = action.payload.data;
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

export const selectors = {
  blackListSelector: (state: IRootState) => state.blackList,
};
