import React from 'react';
import { Paper, TablePagination as TablePaginationBase } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { IPage } from '@app/common/interfaces/IPage';
import { IPagination } from '@app/common/api/request/IPagination';

export interface IProps {
  page: IPage;
  action: (query: IPagination) => object;
}

export const TablePagination: React.FC<IProps> = ({ page, action }) => {
  const dispatch = useDispatch();

  return (
    <Paper style={{ position: 'sticky', bottom: 0 }}>
      <TablePaginationBase
        component='div'
        rowsPerPage={page.size}
        rowsPerPageOptions={[10, 20, 50]}
        page={page.number - 1}
        labelRowsPerPage='Строк на странице:'
        labelDisplayedRows={() => (
          <div>
            {`Страница ${page.number} из ${Math.ceil(page.count / page.size)}`}
          </div>
        )}
        count={page.count}
        onChangeRowsPerPage={e => dispatch(action({
          pageSize: parseInt(e.target.value),
          pageNumber: page.number,
        }))}
        onChangePage={(e, pageNumber) => dispatch(action({
          pageSize: page.size,
          pageNumber: pageNumber + 1,
        }))}
      />
    </Paper>
  );
};
