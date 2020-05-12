import React from 'react';
import { Helmet } from 'react-helmet';

import { LoginForm } from '@app/features/LoginForm/LoginForm';

export const PageLogin: React.FC = () => (
  <div>
    <Helmet>
      <title>Main page</title>
    </Helmet>
    <LoginForm/>
  </div>
);

export { PageLogin as default };
