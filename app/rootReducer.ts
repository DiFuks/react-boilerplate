import { combineReducers } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';

export interface IRootState {
  router: RouterState;
}

export const createRootReducer = (history: History) => combineReducers<IRootState>({
  router: connectRouter(history),
});
