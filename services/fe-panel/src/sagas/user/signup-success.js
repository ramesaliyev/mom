import { takeLatest, put } from 'redux-saga/effects';

import { DO_SIGNUP_SUCCESS } from 'symbols/user';
import { actionDoSignIn } from 'actions/user/signin';

function* watcher() {
  yield takeLatest(DO_SIGNUP_SUCCESS, function* ({ data }) {
    const { email, password } = data;
      
    yield put(actionDoSignIn({
      email,
      password
    }));
  });
}

export default watcher;
