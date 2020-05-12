import { ITodo } from '@app/common/interfaces/response/ITodo';

export enum Types {
  TODO_ON_INIT = 'TODO/ON_INIT',
  TODO_INIT = 'TODO/INIT',
}

export const Creators = {
  onInit: () => ({
    type: Types.TODO_ON_INIT,
  } as const),
  init: (response: ITodo[]) => ({
    type: Types.TODO_INIT,
    payload: {
      response,
    },
  } as const),
};
