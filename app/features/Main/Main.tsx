import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { RoutesPaths } from '@app/common/enums/RoutesPaths';

export const Main: React.FC = () => (
  <MainStyled>
    Main Component
    <div>
      <Link to={RoutesPaths.LOGIN}>To login page</Link>
    </div>
  </MainStyled>
);

const MainStyled = styled.div`
  font-size: 20px;
`;
