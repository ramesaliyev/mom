import { all, fork } from 'redux-saga/effects';

import create from './create';

export default function* () {
  yield all([
    fork(create),
  ]);
}
