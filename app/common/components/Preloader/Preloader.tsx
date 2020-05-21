import React from 'react';
import styled, { css } from 'styled-components';

import cat from '@app/common/components/Preloader/img/cat.gif';

export interface IProps {
  isOpen: boolean;
}

export const Preloader: React.FC<IProps> = ({ isOpen }) => (
  <PreloaderStyled open={isOpen}>
    <img
      src={cat}
      alt='cat'
    />
  </PreloaderStyled>
);

const PreloaderStyled = styled.div<{ open: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  user-select: none;
  opacity: 0;
  transition: opacity .3s ease;
  pointer-events: none;
  touch-action: none;
  ${props => props.open && css`
    opacity: .8;
    pointer-events: auto;
    touch-action: auto;
  `}
`;
