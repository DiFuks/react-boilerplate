import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { RoutesPaths } from '@app/common/enums/RoutesPaths';
import { IWithTodoState, withTodoState } from '@app/features/Todo/hocs/withTodoState';

const TodoComponent: React.FC<IWithTodoState> = ({ completedTodos, initTodos }) => {
  useEffect(() => {
    initTodos();
  }, []);

  return (
    <MainStyled>
      {completedTodos.map(todo => (
        <div key={todo.id}>
          <div>{todo.id}</div>
          <div>{todo.title}</div>
          <div>{todo.userId}</div>
          <div>{todo.completed.toString()}</div>
          <br/>
        </div>
      ))}
      <div>
        <Link to={RoutesPaths.LOGIN}>To login page</Link>
      </div>
    </MainStyled>
  );
};

export const Todo = withTodoState(TodoComponent);

const MainStyled = styled.div`
  font-size: 20px;
`;
