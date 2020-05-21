import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import { TemplateAuth } from '@app/features/TemplateAuth/TemplateAuth';
import { RoutesPaths } from '@app/common/enums/RoutesPaths';
import { PageLogin } from '@app/pages/PageLogin';

export const RouterAuth: React.FC = () => (
  <TemplateAuth>
    <Switch>
      <Route
        path={RoutesPaths.LOGIN}
        component={PageLogin}
        exact={true}
      />
      <Redirect to={RoutesPaths.LOGIN}/>
    </Switch>
  </TemplateAuth>
);
