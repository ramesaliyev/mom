import { takeLatest } from 'redux-saga/effects';

import { DO_SIGNIN } from 'symbols/user';

function* watcher() {
  yield takeLatest(DO_SIGNIN, function* ({ payload }) {
    try {
      yield (Promise.resolve(payload));
    } catch (e) {
      
    }

  });
}

export default watcher;
