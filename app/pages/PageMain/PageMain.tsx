import React from 'react';
import { Helmet } from 'react-helmet';

import { Todo } from '@app/features/Todo/Todo';

export const PageMain: React.FC = () => (
  <div>
    <Helmet>
      <title>Main page</title>
    </Helmet>
    <Todo/>
  </div>
);

export { PageMain as default };
