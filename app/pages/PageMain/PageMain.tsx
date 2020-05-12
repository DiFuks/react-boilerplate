import React from 'react';
import { Helmet } from 'react-helmet';

import { Main } from '@app/features/Main/Main';

export const PageMain: React.FC = () => (
  <div>
    <Helmet>
      <title>Main page</title>
    </Helmet>
    <Main/>
  </div>
);

export { PageMain as default };
