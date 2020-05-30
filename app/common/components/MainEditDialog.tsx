import React, { PropsWithChildren } from 'react';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { AnyObject } from 'react-final-form';
import { ValidationErrors } from 'final-form';

import { MainDialog } from '@app/common/components/MainDialog';
import { MainForm } from '@app/common/components/MainForm';
import { FetchStatus } from '@app/common/enums/FetcStatus';

export interface IProps<T> {
  onSubmit: (data: T) => void;
  onClose: () => void;
  initialValues: T;
  fetchStatus: FetchStatus;
  title: string;
  validate?: (values: T) => ValidationErrors | Promise<ValidationErrors> | undefined;
}

export const MainEditDialog: <FormValues = AnyObject>(
  props: PropsWithChildren<IProps<FormValues>>
) => React.ReactElement = ({
  onSubmit,
  initialValues,
  onClose,
  fetchStatus,
  children,
  title,
  validate,
}) => {
  const dispatch = useDispatch();

  return (
    <MainDialog
      open={!!initialValues}
      onBackdropClick={() => dispatch(onClose())}
    >
      <MainForm
        title={title}
        onSubmit={data => data !== null ? dispatch(onSubmit(data)) : undefined}
        initialValues={initialValues}
        validate={validate}
        validateOnBlur={true}
        actions={(
          <>
            <Button
              color='secondary'
              onClick={() => dispatch(onClose())}
            >
              Закрыть
            </Button>
            <Button
              color='primary'
              type='submit'
              disabled={fetchStatus === FetchStatus.IN_PROGRESS}
            >
              Сохранить
            </Button>
          </>
        )}
      >
        {children}
      </MainForm>
    </MainDialog>
  );
};
