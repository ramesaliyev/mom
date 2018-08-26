import { takeLatest, select } from 'redux-saga/effects';

import { addDefaultHeaders } from 'config';
import { APP_INITIALIZED } from 'symbols/app';
import { getUserToken } from 'selectors/user';

function* watcher() {
  yield takeLatest(APP_INITIALIZED, function* ({ payload }) {
    const state = yield select();

    addDefaultHeaders({
      Authorization: getUserToken(state)
    });
  });
}

export default watcher;
