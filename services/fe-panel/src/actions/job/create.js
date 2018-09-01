import {
  CREATE_JOB,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_FAILURE,
} from 'symbols/job';

export const actionCreateJob = payload => ({
  type: CREATE_JOB,
  payload,
});

export const actionCreateJobSuccess = data => ({
  type: CREATE_JOB_SUCCESS,
  data,
});

export const actionCreateJobFailure = error => ({
  type: CREATE_JOB_FAILURE,
  error,
});