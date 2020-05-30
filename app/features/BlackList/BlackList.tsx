import React from 'react';
import { Switch, TableCell, TableRow } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Switches, makeValidate } from 'mui-rff';
import * as Yup from 'yup';

import { actions, asyncActions, selectors } from '@app/features/BlackList/@slice';
import { Table } from '@app/common/components/Table/Table';
import { TableCellDate } from '@app/common/components/Table/TableCellDate';
import { MainEditDialog } from '@app/common/components/MainEditDialog';
import { TableCellEdit } from '@app/common/components/Table/TableCellEdit';
import { MainAddButton } from '@app/common/components/MainAddButton';
import { RecursivePartial } from '@app/common/utils/recursivePartial';
import { IBlackList } from '@app/common/api/response/IBlackList';
import { validations } from '@app/common/utils/validations';

const schema = Yup.object().shape<RecursivePartial<IBlackList>>({
  phone: Yup.object().shape({
    phone: validations.phone,
  }),
});

const validate = makeValidate(schema);

enum Titles {
  ID = 'ID',
  NUMBER = 'Номер',
  IS_ACTIVE = 'Активность',
  UPDATE = 'Обновлено',
  CREATE = 'Добавлено',
  EDIT = 'Редактировать',
}

const Fields = () => (
  <>
    <TextField
      name='phone.phone'
      label='Телефон'
      required={true}
    />
    <Switches
      name='is_active'
      data={{ label: Titles.IS_ACTIVE, value: true }}
    />
  </>
);

export const BlackList: React.FC = () => {
  const dispatch = useDispatch();
  const blackList = useSelector(selectors.blackListSelector);

  return (
    <>
      <Table
        page={blackList.page}
        fetch={asyncActions.read}
        titles={Object.values(Titles)}
        fetchStatus={blackList.fetchStatus}
        actions={actions}
        error={blackList.error}
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
            <TableCellEdit onClick={() => dispatch(actions.openUpdate(row))}/>
          </TableRow>
        ))}
      </Table>
      <MainAddButton
        onClick={() => dispatch(actions.openCreate({
          is_active: true,
        }))}
      />
      {blackList.createCurrent && (
        <MainEditDialog
          title='Создание черного списка'
          onSubmit={asyncActions.create}
          onClose={actions.resetCreate}
          initialValues={blackList.createCurrent}
          fetchStatus={blackList.fetchStatus}
          validate={validate}
        >
          <Fields/>
        </MainEditDialog>
      )}
      {blackList.updateCurrent && (
        <MainEditDialog
          title='Редактирования черного списка'
          onSubmit={asyncActions.update}
          onClose={actions.resetUpdate}
          initialValues={blackList.updateCurrent}
          fetchStatus={blackList.fetchStatus}
          validate={validate}
        >
          <Fields/>
        </MainEditDialog>
      )}
    </>
  );
};
