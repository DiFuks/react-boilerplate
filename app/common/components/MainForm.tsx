import React, { ReactNode } from 'react';
import { AnyObject, Form, FormProps } from 'react-final-form';
import { Grid } from '@material-ui/core';

import { MainCard } from '@app/common/components/MainCard';

export interface IProps<T> extends FormProps<T> {
  title?: string;
  actions?: ReactNode;
  children: ReactNode[];
}

export const MainForm: <FormValues = AnyObject>(props: IProps<FormValues>) => React.ReactElement = ({
  title,
  actions,
  children,
  ...props
}) => (
  <Form
    {...props}
    validateOnBlur={true}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <MainCard
          title={title}
          actions={actions}
        >
          <Grid
            container={true}
            spacing={2}
          >
            {children.map((field, idx) => (
              <Grid
                item={true}
                xs={12}
                key={idx}
              >
                {field}
              </Grid>
            ))}
          </Grid>
        </MainCard>
      </form>
    )}
  />
);
