import defaultsDeep from 'lodash/defaultsDeep';

import { IResponse } from '@app/common/api/response/IResponse';
import { ILogin } from '@app/common/api/request/ILogin';
import { IToken } from '@app/common/api/response/IToken';

enum Routes {
  LOGIN = '/admin/login',
}

const fetchMain = <T>(route: string, options: RequestInit = {}) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  return fetch(`${process.env.API_URL}${route}`, defaultsDeep(options, {
    headers,
  }));
};

export const api = {
  login: (login: ILogin) => fetchMain<IResponse<IToken[]>>(Routes.LOGIN, {
    method: 'POST',
    body: JSON.stringify(login),
  }),
};
