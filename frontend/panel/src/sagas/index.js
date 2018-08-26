import { all, fork } from 'redux-saga/effects';

import app from './app';
import user from './user';

export default function* () {
  yield all([
    fork(app),
    fork(user),
  ]);
}
