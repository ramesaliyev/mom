import { takeLatest } from 'redux-saga/effects';

import { RENEW_TOKEN_SUCCESS } from 'symbols/user';
import { addDefaultHeaders } from 'config';
import { scheduleRenewToken } from 'core/helpers/renew-token';  
import { getSocket } from 'globals/socket';

function* watcher() {
  yield takeLatest(RENEW_TOKEN_SUCCESS, function* ({ data }) { // eslint-disable-line
    addDefaultHeaders({
      Authorization: data.accessToken
    });

    getSocket()
      .login(data);

    scheduleRenewToken(data);
  });
}

export default watcher;
