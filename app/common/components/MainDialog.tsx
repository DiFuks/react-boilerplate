import React from 'react';
import { Dialog as DialogCommon } from '@material-ui/core';
import { DialogProps } from '@material-ui/core/Dialog/Dialog';
import styled from 'styled-components';

export const MainDialog: React.FC<DialogProps> = ({ children, ...props }) => (
  <DialogStyled {...props}>
    {children}
  </DialogStyled>
);

const DialogStyled = styled(DialogCommon)`
  & .MuiDialog-paper {
    overflow: unset;
  }
`;
