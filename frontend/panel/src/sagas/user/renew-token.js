import { takeLatest, put } from 'redux-saga/effects';

import { RENEW_TOKEN } from 'symbols/user';
import { actionRenewTokenSuccess, actionRenewTokenFailure } from 'actions/user/renew';
import { renewToken as renewTokenService } from 'core/services/auth'

function* watcher() {
  yield takeLatest(RENEW_TOKEN, function* () {
    let response;

    try {
      response = yield renewTokenService();
    } catch (e) {
      return yield put(actionRenewTokenFailure(e));
    }

    yield put(actionRenewTokenSuccess(response.data));
  });
}

export default watcher;
