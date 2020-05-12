import React, { lazy } from 'react';
import { Route, Switch } from 'react-router';

import { TemplateAuth } from '@app/features/TemplateAuth/TemplateAuth';
import { RoutesPaths } from '@app/common/enums/RoutesPaths';

const PageLogin = lazy(() => import('@app/pages/PageLogin/PageLogin'));

export const RouterAuth: React.FC = () => (
  <TemplateAuth>
    <Switch>
      <Route
        path={RoutesPaths.LOGIN}
        component={PageLogin}
        exact={true}
      />
    </Switch>
  </TemplateAuth>
);

export { RouterAuth as default };
