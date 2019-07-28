import { actionUpdateJob } from 'actions/job/update';
import { getStore } from '../core/store';

export const jobUpdated = job => {
  getStore().dispatch(actionUpdateJob(job));
}