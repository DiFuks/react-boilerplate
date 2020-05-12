import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ITodo } from '@app/common/interfaces/response/ITodo';
import { IResponse } from '@app/common/interfaces/response/IResponse';
import { IPagination } from '@app/common/interfaces/request/IPagination';
import { apiPlaceholder } from '@app/common/api/apiPlaceholder';
import { IRootState } from '@app/store';

export const todosAdapter = createEntityAdapter<ITodo>();

export const operations = {
  fetchTodos: createAsyncThunk(
    'todo/fetchTodos',
    async (pagination: IPagination) => await apiPlaceholder.fetchTodos(pagination),
  ),
};

export const { reducer } = createSlice({
  name: 'todo',
  initialState: todosAdapter.getInitialState({ page: 0 }),
  reducers: {},
  extraReducers: {
    [operations.fetchTodos.fulfilled.type]: (state, action: PayloadAction<IResponse<ITodo[]>>) => {
      todosAdapter.setAll(state, action.payload.data);

      state.page = action.payload.page;
    },
  },
});

export const selectors = {
  ...todosAdapter.getSelectors((state: IRootState) => state.todo),
  pageSelector: (state: IRootState) => state.todo.page,
};
