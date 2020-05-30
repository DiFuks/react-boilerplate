import React, { ReactNode } from 'react';
import { Card, CardContent, CardActions } from '@material-ui/core';
import styled from 'styled-components';

import { themeSelector } from '@app/common/utils/themeSelector';

export type IProps = {
  title?: string;
  actions?: ReactNode;
}

export const MainCard: React.FC<IProps> = ({ children, title, actions }) => (
  <CardStyled>
    {title && (
      <HeaderStyled>{title}</HeaderStyled>
    )}
    <CardContent>
      {children}
    </CardContent>
    {actions && (
      <CardActionsStyled>
        {actions}
      </CardActionsStyled>
    )}
  </CardStyled>
);

const CardStyled = styled(Card)`
  width: 300px;
  && {
    overflow: unset;
  }
`;

const HeaderStyled = styled.div`
  background: ${themeSelector.primaryMain};
  width: 80%;
  border-radius: 3px;
  color: ${themeSelector.textContrast};
  text-align: center;
  padding: 20px 20px;
  font-weight: 100;
  transform: translateY(-15px);
  margin: auto;
  box-sizing: border-box;
`;

const CardActionsStyled = styled(CardActions)`
  display: flex;
  > * {
    flex-grow: 1;
  }
`;
