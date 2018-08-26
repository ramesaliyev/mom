import { all, fork } from 'redux-saga/effects';

import signIn from './signin';
import signInSuccess from './signin-success';
import signOut from './signout';

export default function* () {
  yield all([
    fork(signIn),
    fork(signInSuccess),
    fork(signOut),
  ]);
}
