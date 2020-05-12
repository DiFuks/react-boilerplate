import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createBrowserHistory } from 'history';

import { createRootReducer } from '@app/rootReducer';
import { rootSaga } from '@app/rootSaga';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  createRootReducer(history),
  composeWithDevTools(
    applyMiddleware(sagaMiddleware),
  ),
);

sagaMiddleware.run(rootSaga);

export { store };
