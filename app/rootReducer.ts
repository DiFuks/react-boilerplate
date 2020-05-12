import { combineReducers } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';

import { reducer as todoReducer, IState as ITodoState } from '@app/features/Todo/duck/reducer';

export interface IRootState {
  router: RouterState;
  todo: ITodoState;
}

export const createRootReducer = (history: History) => combineReducers<IRootState>({
  router: connectRouter(history),
  todo: todoReducer,
});
