import { connect, InferableComponentEnhancer } from 'react-redux';
import { Dispatch } from 'redux';

import { IRootState } from '@app/rootReducer';
import { completedTodosSelector } from '@app/features/Todo/duck/selectors';
import { Creators } from '@app/features/Todo/duck/actions';

const mapStateToProps = (state: IRootState) => ({
  completedTodos: completedTodosSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  initTodos: () => dispatch(Creators.onInit()),
});

export type IStateProps = ReturnType<typeof mapStateToProps>;

export type IDispatchProps = ReturnType<typeof mapDispatchToProps>;

export type IWithTodoState = IStateProps & IDispatchProps;

export const withTodoState: InferableComponentEnhancer<IWithTodoState> = component => (
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(component)
);
