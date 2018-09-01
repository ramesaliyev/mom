import { all, fork } from 'redux-saga/effects';

import init from './init';

export default function* () {
  yield all([
    fork(init),
  ]);
}
