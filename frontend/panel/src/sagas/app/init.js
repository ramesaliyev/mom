import { takeLatest, put, select } from 'redux-saga/effects';

import { APP_INITIALIZED } from 'symbols/app';
import { actionDoSignInSuccess } from 'actions/user/signin';
import { getUserInfo } from 'selectors/user';

function* watcher() {
  yield takeLatest(APP_INITIALIZED, function* ({ payload }) {
    const state = yield select();
    const userInfo = getUserInfo(state);

    if (userInfo) {
      yield put(actionDoSignInSuccess(userInfo));
    }
  });
}

export default watcher;
