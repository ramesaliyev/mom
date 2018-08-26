import { takeLatest } from 'redux-saga/effects';

import { DO_SIGNIN_SUCCESS } from 'symbols/user';
import { addDefaultHeaders } from 'config';
import { getSocket } from 'globals/socket';

function* watcher() {
  yield takeLatest(DO_SIGNIN_SUCCESS, function* ({ data }) { // eslint-disable-line
    addDefaultHeaders({
      Authorization: data.accessToken
    });

    getSocket()
      .connect(data)
      .trace()
      .login();
  });
}

export default watcher;
