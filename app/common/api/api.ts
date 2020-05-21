import defaultsDeep from 'lodash/defaultsDeep';
import qs from 'qs';

import { IResponse } from '@app/common/api/response/IResponse';
import { ILogin } from '@app/common/api/request/ILogin';
import { IToken } from '@app/common/api/response/IToken';
import { IBlackList } from '@app/common/api/response/IBlackList';
import { IPagination } from '@app/common/api/request/IPagination';

export interface IFetchResponse<T> extends Response {
  json(): Promise<IResponse<T>>;
}

enum Routes {
  LOGIN = '/admin/login',
  BLACK_LIST = '/admin/phone-blacklist',
}

const fetchMain = <T>(route: string, options: RequestInit = {}): Promise<IFetchResponse<T>> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Token bpTPbyZQpc7vYCZz`, // TODO заменить на получение токена из auth-сервиса
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
  blackList: {
    read: (query?: IPagination) => (
      fetchMain<IResponse<IBlackList[]>>(`${Routes.BLACK_LIST}?${qs.stringify(query)}`, {
        method: 'GET',
      })
    ),
    update: (data: IBlackList) => (
      fetchMain<IResponse<IBlackList>>(Routes.BLACK_LIST, {
        method: 'PATCH',
        body: JSON.stringify(data),
      })
    ),
  },
};
