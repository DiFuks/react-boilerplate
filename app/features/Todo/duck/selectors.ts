import { createSelector } from 'reselect';

import { IRootState } from '@app/rootReducer';

export const todosSelector = (state: IRootState) => state.todo.todos;

export const completedTodosSelector = createSelector(
  todosSelector,
  todos => todos.filter(todo => todo.completed),
);
