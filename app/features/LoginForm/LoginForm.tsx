import React from 'react';
import { Link } from 'react-router-dom';

import { RoutesPaths } from '@app/common/enums/RoutesPaths';

export const LoginForm: React.FC = () => (
  <div>
    Login form
    <div>
      <Link to={RoutesPaths.MAIN}>To main page</Link>
    </div>
  </div>
);
