import React from 'react';
import { Helmet } from 'react-helmet';

import { Login } from '@app/features/Login/Login';

export const PageLogin: React.FC = () => (
  <>
    <Helmet>
      <title>Главная страница</title>
    </Helmet>
    <Login/>
  </>
);
