import React from 'react';
import { Link } from 'react-router-dom';

import { RoutesPaths } from '@app/common/enums/RoutesPaths';

export const Todo: React.FC = () => (
  <div>
    Главная
    <Link to={RoutesPaths.LOGIN}>К форме входа</Link>
  </div>
);
