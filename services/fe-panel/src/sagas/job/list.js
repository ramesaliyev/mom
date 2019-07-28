import { takeLatest, put } from 'redux-saga/effects';

import { LOAD_OWN_JOBS } from 'symbols/job';
import { actionLoadOwnJobsSuccess, actionLoadOwnJobsFailure } from 'actions/job/load';
import { list as listOwnJobsService } from 'core/services/job'

function* watcher() {
  yield takeLatest(LOAD_OWN_JOBS, function* ({ payload }) {
    let response;

    try {
      response = yield listOwnJobsService(payload);
    } catch (e) {
      return yield put(actionLoadOwnJobsFailure(e));
    }

    yield put(actionLoadOwnJobsSuccess(response.data));
  });
}

export default watcher;
