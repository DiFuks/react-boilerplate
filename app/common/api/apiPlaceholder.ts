import qs from 'qs';

import { ITodo } from '@app/common/interfaces/response/ITodo';
import { fetchBase } from '@app/common/utils/fetchBase';
import { IResponse } from '@app/common/interfaces/response/IResponse';
import { IPagination } from '@app/common/interfaces/request/IPagination';

enum Routes {
  TODOS = '/api/users',
}

const fetchPlaceholder = <T>(route: string, options: RequestInit = {}) => (
  fetchBase<T>(process.env.API_URL, route, options)
);

export const apiPlaceholder = {
  fetchTodos: (pagination: IPagination) => (
    fetchPlaceholder<IResponse<ITodo[]>>(`${Routes.TODOS}?${qs.stringify(pagination)}`)
  ),
};
