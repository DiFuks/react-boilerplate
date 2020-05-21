import React from 'react';
import { Helmet } from 'react-helmet';

import { BlackList } from '@app/features/BlackList/BlackList';

export const PageBlackList: React.FC = () => (
  <div>
    <Helmet>
      <title>Черный список</title>
    </Helmet>
    <BlackList/>
  </div>
);
