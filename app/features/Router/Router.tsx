import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';

const RouterAuth = lazy(() => import('@app/features/Router/RouterAuth'));
const RouterMain = lazy(() => import('@app/features/Router/RouterMain'));

enum RoutesPathsBase {
  MAIN = '/',
  AUTH = '/auth',
}

export const Router: React.FC = () => (
  <Suspense fallback=''>
    <Switch>
      <Route
        path={RoutesPathsBase.AUTH}
        component={RouterAuth}
      />
      <Route
        path={RoutesPathsBase.MAIN}
        component={RouterMain}
      />
    </Switch>
  </Suspense>
);
