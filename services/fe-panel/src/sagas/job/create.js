import { takeLatest, put } from 'redux-saga/effects';

import { CREATE_JOB } from 'symbols/job';
import { actionCreateJobSuccess, actionCreateJobFailure } from 'actions/job/create';
import { create as createJobService } from 'core/services/job'

function* watcher() {
  yield takeLatest(CREATE_JOB, function* ({ payload }) {
    let response;

    try {
      response = yield createJobService(payload);
    } catch (e) {
      return yield put(actionCreateJobFailure(e));
    }

    yield put(actionCreateJobSuccess(response.data));
  });
}

export default watcher;
