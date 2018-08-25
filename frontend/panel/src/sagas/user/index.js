import { all, fork } from 'redux-saga/effects';

import signIn from './signin';

/**
 * Root user objects.
 */
export default function* () {
  yield all([
    fork(signIn),
  ]);
}
