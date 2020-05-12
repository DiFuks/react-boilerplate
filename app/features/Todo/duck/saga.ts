import { all, call, put, takeEvery } from 'redux-saga/effects';

import { Creators, Types } from '@app/features/Todo/duck/actions';
import { apiPlaceholder } from '@app/common/api/apiPlaceholder';

function* init() {
  const response = yield call(apiPlaceholder.fetchTodos);

  put(Creators.init(response));
}

function* onInit() {
  yield takeEvery(Types.TODO_ON_INIT, init);
}

export function* saga() {
  yield all([
    onInit(),
  ]);
}
