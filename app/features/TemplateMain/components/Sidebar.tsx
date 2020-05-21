import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Phone } from '@material-ui/icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { RoutesPaths } from '@app/common/enums/RoutesPaths';
import { themeSelector } from '@app/common/utils/themeSelector';

export interface IProps {
  isOpen: boolean;
}

export const Sidebar: React.FC<IProps> = ({ isOpen }) => (
  <DrawerStyled
    open={isOpen}
    anchor='left'
    variant='persistent'
  >
    <List>
      <LinkStyled to={RoutesPaths.BLACK_LIST}>
        <ListItem button={true}>
          <ListItemIcon><Phone/></ListItemIcon>
          <ListItemText>Черный список</ListItemText>
        </ListItem>
      </LinkStyled>
    </List>
  </DrawerStyled>
);

const LinkStyled = styled(Link)`
  color: ${themeSelector.textPrimary};
  text-decoration: none;
`;

const DrawerStyled = styled(Drawer)<{ open: boolean }>`
  width: ${props => props.open ? '250px' : '0'};
  transition: width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;

  && > * {
    width: 250px;
    position: relative;
  }
`;
