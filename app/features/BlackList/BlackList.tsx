import React from 'react';
import { Switch, TableCell, TableRow } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { asyncActions, selectors } from '@app/features/BlackList/@slice';
import { Table } from '@app/common/components/Table/Table';
import { TableCellDate } from '@app/common/components/Table/TableCellDate';

export const BlackList: React.FC = () => {
  const dispatch = useDispatch();
  const blackList = useSelector(selectors.blackListSelector);

  return (
    <Table
      page={blackList.page}
      action={asyncActions.read}
      titles={['ID', 'Номер', 'Активность', 'Обновлено', 'Добавлено']}
      fetchStatus={blackList.fetchStatus}
    >
      {blackList.data.map(row => (
        <TableRow key={row.id}>
          <TableCell>
            {row.id}
          </TableCell>
          <TableCell>{row.phone.phone}</TableCell>
          <TableCell>
            <Switch
              checked={row.is_active}
              onChange={() => dispatch(asyncActions.update({
                ...row,
                is_active: !row.is_active,
              }))}
              color='primary'
            />
          </TableCell>
          <TableCellDate>{row.updated_at}</TableCellDate>
          <TableCellDate>{row.created_at}</TableCellDate>
        </TableRow>
      ))}
    </Table>
  );
};
