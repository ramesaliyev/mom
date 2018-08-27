import { takeLatest, put } from 'redux-saga/effects';

import { DO_SIGNUP } from 'symbols/user';
import { actionDoSignUpSuccess, actionDoSignUpFailure } from 'actions/user/signup';
import { register as registerService } from 'core/services/auth'

function* watcher() {
  yield takeLatest(DO_SIGNUP, function* ({ payload }) {
    let response;

    try {
      response = yield registerService(payload);
    } catch (e) {
      return yield put(actionDoSignUpFailure(e));
    }

    yield put(actionDoSignUpSuccess(response.data));
  });
}

export default watcher;
