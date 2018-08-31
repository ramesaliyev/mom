import { all, fork } from 'redux-saga/effects';

import app from './app';
import job from './job';
import user from './user';

export default function* () {
  yield all([
    fork(app),
    fork(job),
    fork(user),
  ]);
}
