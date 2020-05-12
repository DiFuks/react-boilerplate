import React, { lazy } from 'react';
import { Route, Switch } from 'react-router';

import { TemplateMain } from '@app/features/TemplateMain/TemplateMain';
import { RoutesPaths } from '@app/common/enums/RoutesPaths';

const PageMain = lazy(() => import('@app/pages/PageMain/PageMain'));

export const RouterMain: React.FC = () => (
  <TemplateMain>
    <Switch>
      <Route
        path={RoutesPaths.MAIN}
        component={PageMain}
        exact={true}
      />
    </Switch>
  </TemplateMain>
);

export { RouterMain as default };
