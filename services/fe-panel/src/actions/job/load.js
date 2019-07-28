import {
  LOAD_OWN_JOBS,
  LOAD_OWN_JOBS_SUCCESS,
  LOAD_OWN_JOBS_FAILURE,
} from 'symbols/job';

export const actionLoadOwnJobs = payload => ({
  type: LOAD_OWN_JOBS,
  payload,
});

export const actionLoadOwnJobsSuccess = data => ({
  type: LOAD_OWN_JOBS_SUCCESS,
  data,
});

export const actionLoadOwnJobsFailure = error => ({
  type: LOAD_OWN_JOBS_FAILURE,
  error,
});