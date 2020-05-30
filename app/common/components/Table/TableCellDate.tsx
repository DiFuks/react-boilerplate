import React from 'react';
import { TableCell } from '@material-ui/core';
import moment from 'moment';

export interface IProps {
  children?: string;
}

export const TableCellDate: React.FC<IProps> = ({ children }) => (
  <TableCell>{moment(children).format('DD MMMM YYYY, HH:mm')}</TableCell>
);
