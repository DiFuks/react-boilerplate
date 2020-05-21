import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import moment from 'moment';

import '@app/common/typings/import';
import { history, store } from '@app/store';
import { Router } from '@app/features/Router/Router';
import { Theme } from '@app/features/Theme/Theme';

moment.locale('ru');

export const App: React.FC = hot(() => (
  <Provider store={store}>
    <Theme>
      <Suspense fallback={<div/>}>
        <ConnectedRouter history={history}>
          <Router/>
        </ConnectedRouter>
      </Suspense>
    </Theme>
  </Provider>
));

