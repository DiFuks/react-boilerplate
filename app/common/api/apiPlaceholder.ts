import { ITodo } from '@app/common/interfaces/response/ITodo';
import { fetchBase } from '@app/common/utils/fetchBase';

enum Routes {
  TODOS = '/todos',
}

const fetchPlaceholder = <T>(route: Routes, options: RequestInit = {}) => (
  fetchBase<T>(process.env.API_URL, route, options)
);

export const apiPlaceholder = {
  fetchTodos: () => fetchPlaceholder<ITodo[]>(Routes.TODOS),
};
