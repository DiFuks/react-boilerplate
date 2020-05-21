import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Paper,
  Table as TableBase,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

import { TablePagination } from '@app/common/components/Table/TablePagination';
import { IPagination } from '@app/common/api/request/IPagination';
import { IPage } from '@app/common/interfaces/IPage';
import { FetchStatus } from '@app/common/enums/FetcStatus';
import { Preloader } from '@app/common/components/Preloader/Preloader';

export interface IProps {
  action: (query?: IPagination) => object;
  page: IPage;
  titles: string[];
  fetchStatus: FetchStatus;
}

export const Table: React.FC<IProps> = ({ action, children, page, titles, fetchStatus }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetchStatus === FetchStatus.NONE) {
      dispatch(action());
    }
  }, []);

  return (
    <TableContainer
      component={Paper}
      style={{ overflow: 'initial' }}
    >
      <TableBase>
        <TableHead>
          <TableRow>
            {titles.map(title => (
              <TableCell key={title}>{title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {children}
        </TableBody>
      </TableBase>
      <Paper style={{ position: 'sticky', bottom: 0 }}>
        <TablePagination
          page={page}
          action={action}
        />
      </Paper>
      <Preloader isOpen={fetchStatus === FetchStatus.IN_PROGRESS}/>
    </TableContainer>
  );
};
