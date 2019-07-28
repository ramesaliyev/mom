import { all, fork } from 'redux-saga/effects';

import create from './create';
import list from './list';

export default function* () {
  yield all([
    fork(create),
    fork(list),
  ]);
}
