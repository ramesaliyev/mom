import {
  UPDATE_JOB,
} from 'symbols/job';

export const actionUpdateJob = data => ({
  type: UPDATE_JOB,
  data,
});