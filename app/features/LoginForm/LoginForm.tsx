import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RoutesPaths } from '@app/common/enums/RoutesPaths';
import { actions, selectors } from '@app/features/LoginForm/@slice';

export const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const text = useSelector(selectors.textSelector);

  return (
    <div>
      Login form
      <div>
        <div>{text}</div>
        <input onChange={e => dispatch(actions.changeText(e.target.value))}/>
        <Link to={RoutesPaths.MAIN}>To main page</Link>
      </div>
    </div>
  );
};
