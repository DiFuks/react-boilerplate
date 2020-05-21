import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import { auth } from '@app/common/utils/auth';
import { RouterAuth } from '@app/features/Router/RouterAuth';
import { RouterMain } from '@app/features/Router/RouterMain';

enum RoutesPathsBase {
  MAIN = '/',
  AUTH = '/auth',
}

export const Router: React.FC = () => (
  <Switch>
    <Route
      path={RoutesPathsBase.AUTH}
      component={() => !auth.isAuth() ? (
        <RouterAuth/>
      ) : (
        <Redirect to={RoutesPathsBase.MAIN}/>
      )}
    />
    <Route
      path={RoutesPathsBase.MAIN}
      component={() => auth.isAuth() ? (
        <RouterMain/>
      ) : (
        <Redirect to={RoutesPathsBase.AUTH}/>
      )}
    />
  </Switch>
);
