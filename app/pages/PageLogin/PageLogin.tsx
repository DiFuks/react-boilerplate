import React from 'react';
import { Helmet } from 'react-helmet';

import { Login } from '@app/features/Login/Login';

export const PageLogin: React.FC = () => (
  <>
    <Helmet>
      <title>Main page</title>
    </Helmet>
    <Login/>
  </>
);

export { PageLogin as default };
