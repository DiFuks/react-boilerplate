import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { history, store } from '@app/store';
import { Router } from '@app/features/Router/Router';

export const App: React.FC = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Router/>
    </ConnectedRouter>
  </Provider>
);
