import React from 'react';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

import { auth } from '@app/common/utils/auth';
import { RoutesPaths } from '@app/common/enums/RoutesPaths';
import { themeSelector } from '@app/common/utils/themeSelector';

export interface IProps {
  onMenuClick: () => void;
}

export const Header: React.FC<IProps> = ({ onMenuClick }) => (
  <AppBarStyled position='static'>
    <Toolbar>
      <IconButton
        edge='start'
        color='inherit'
        aria-label='menu'
        onClick={onMenuClick}
      >
        <Menu/>
      </IconButton>
      <TitleStyled
        variant='h6'
      >
        <LinkStyled to={RoutesPaths.MAIN}>
          Админка IVR
        </LinkStyled>
      </TitleStyled>
      <Button
        color='inherit'
        onClick={() => auth.logout()}
      >
        Выход
      </Button>
    </Toolbar>
  </AppBarStyled>
);

const AppBarStyled = styled(AppBar)`
  height: 64px;
`;

const TitleStyled = styled(Typography)`
  flex-grow: 1;
`;

const LinkStyled = styled(Link)`
  color: ${themeSelector.textContrast};
  text-decoration: none;
`;
