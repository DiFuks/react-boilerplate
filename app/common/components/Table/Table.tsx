import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  IconButton,
  Paper,
  Snackbar,
  Table as TableBase,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Edit } from '@material-ui/icons';

import { TablePagination } from '@app/common/components/Table/TablePagination';
import { IPagination } from '@app/common/api/request/IPagination';
import { IPage } from '@app/common/interfaces/IPage';
import { FetchStatus } from '@app/common/enums/FetcStatus';
import { Preloader } from '@app/common/components/Preloader/Preloader';

export interface IProps {
  fetch: (query?: IPagination) => object;
  page: IPage;
  titles: string[];
  fetchStatus: FetchStatus;
  error: null | string;
  actions: {
    resetError: () => void;
  };
  onUpdate?: () => void;
}

export const Table: React.FC<IProps> = ({
  fetch,
  children,
  page,
  titles,
  fetchStatus,
  actions,
  error,
  onUpdate,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetchStatus === FetchStatus.NONE) {
      dispatch(fetch());
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
          {onUpdate && (
            <TableCell>
              <IconButton
                color='primary'
                component='span'
                onClick={onUpdate}
              >
                <Edit/>
              </IconButton>
            </TableCell>
          )}
        </TableBody>
      </TableBase>
      <Paper style={{ position: 'sticky', bottom: 0 }}>
        <TablePagination
          page={page}
          action={fetch}
        />
      </Paper>
      <Preloader
        isOpen={fetchStatus === FetchStatus.IN_PROGRESS}
      />
      <Snackbar
        open={fetchStatus === FetchStatus.FAILED}
        onClose={() => dispatch(actions.resetError())}
        autoHideDuration={3000}
      >
        <Alert
          severity='error'
          elevation={6}
          variant='filled'
          onClose={() => dispatch(actions.resetError())}
        >
          {error}
        </Alert>
      </Snackbar>
    </TableContainer>
  );
};
