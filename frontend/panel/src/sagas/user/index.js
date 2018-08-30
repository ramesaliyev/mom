import { all, fork } from 'redux-saga/effects';

import signIn from './signin';
import signInSuccess from './signin-success';
import signUp from './signup';
import signUpSuccess from './signup-success';
import renewToken from './renew-token';
import renewTokenSuccess from './renew-token-success';
import signOut from './signout';

export default function* () {
  yield all([
    fork(signIn),
    fork(signInSuccess),
    fork(signUp),
    fork(signUpSuccess),
    fork(renewToken),
    fork(renewTokenSuccess),
    fork(signOut),
  ]);
}
