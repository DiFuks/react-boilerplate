import React from 'react';
import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import styled from 'styled-components';

export interface IProps {
  onClick: () => void;
}

export const MainAddButton: React.FC<IProps> = ({ onClick }) => (
  <FabStyled
    color='primary'
    onClick={onClick}
  >
    <Add/>
  </FabStyled>
);

const FabStyled = styled(Fab)`
  && {
    position: fixed;
  }
  right: 40px;
  bottom: 80px;
`;
