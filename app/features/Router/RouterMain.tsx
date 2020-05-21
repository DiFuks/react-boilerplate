import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import { TemplateMain } from '@app/features/TemplateMain/TemplateMain';
import { RoutesPaths } from '@app/common/enums/RoutesPaths';
import { PageMain } from '@app/pages/PageMain';
import { PageBlackList } from '@app/pages/PageBlackList';

export const RouterMain: React.FC = () => (
  <TemplateMain>
    <Switch>
      <Route
        path={RoutesPaths.MAIN}
        component={PageMain}
        exact={true}
      />
      <Route
        path={RoutesPaths.BLACK_LIST}
        component={PageBlackList}
        exact={true}
      />
      <Redirect to={RoutesPaths.MAIN}/>
    </Switch>
  </TemplateMain>
);
