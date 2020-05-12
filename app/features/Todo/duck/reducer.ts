import { produce } from 'immer';

import { ITodo } from '@app/common/interfaces/response/ITodo';
import { InferValueTypes } from '@app/common/utils/inferValue';
import { Creators, Types } from '@app/features/Todo/duck/actions';

export interface IState {
  todos: ITodo[];
}

type ActionTypes = ReturnType<InferValueTypes<typeof Creators>>;

const initState: IState = {
  todos: [],
};

export const reducer = (state = initState, action: ActionTypes) => produce(state, draft => {
  switch (action.type) {
  case Types.TODO_INIT:
    draft.todos = action.payload.response;

    return;
  default:
    return;
  }
});
