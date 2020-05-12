import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RoutesPaths } from '@app/common/enums/RoutesPaths';
import { operations, selectors } from '@app/features/Todo/@slice';

export const Todo: React.FC = () => {
  const dispatch = useDispatch();
  const completedTodos = useSelector(selectors.selectAll);
  const page = useSelector(selectors.pageSelector);
  const onPaginationClick = (page: number) => dispatch(operations.fetchTodos({
    page,
  }));

  useEffect(() => {
    onPaginationClick(1);
  }, []);

  return (
    <MainStyled>
      <div>
        {completedTodos.map(todo => (
          <div key={todo.id}>
            <div>{todo.id}</div>
            <div>{todo.first_name}</div>
            <div>{todo.last_name}</div>
            <br/>
          </div>
        ))}
      </div>
      <div>
        <div>Page {page}</div>
        <button onClick={() => onPaginationClick(page + 1)}>More</button>
      </div>
      <div>
        <Link to={RoutesPaths.LOGIN}>To login page</Link>
      </div>
    </MainStyled>
  );
};

const MainStyled = styled.div`
  font-size: 20px;
`;
