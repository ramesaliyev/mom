import { takeLatest, put } from 'redux-saga/effects';

import { DO_SIGNIN } from 'symbols/user';
import { actionDoSignInSuccess, actionDoSignInFailure } from 'actions/user/signin';
import { login as loginService } from 'core/services/auth'

function* watcher() {
  yield takeLatest(DO_SIGNIN, function* ({ payload }) {
    let response;

    try {
      response = yield loginService(payload);
    } catch (e) {
      return yield put(actionDoSignInFailure(e));
    }

    yield put(actionDoSignInSuccess(response.data));
  });
}

export default watcher;
