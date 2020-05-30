import React from 'react';
import { IconButton, TableCell } from '@material-ui/core';
import { Edit } from '@material-ui/icons';

export interface IProps {
  onClick: () => void;
}

export const TableCellEdit: React.FC<IProps> = ({ onClick }) => (
  <TableCell>
    <IconButton
      color='primary'
      component='span'
      onClick={onClick}
    >
      <Edit/>
    </IconButton>
  </TableCell>
);
