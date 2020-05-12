import { all } from 'redux-saga/effects';

import { saga as todoSaga } from '@app/features/Todo/duck/saga';

export function* rootSaga() {
  yield all([
    todoSaga(),
  ]);
}
