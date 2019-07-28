const getJobState = state => state.job;

const getJobCreateState = (state) => (getJobState(state) || {}).create;
export const isJobCreationInProgress = (state) => (getJobCreateState(state) || {}).loading;

const getOwnJobsState = (state) => (getJobState(state) || {}).list;
export const getOwnJobsData = (state) => (getOwnJobsState(state) || {}).data;
export const isFetchingOwnJobsInProgress = (state) => (getOwnJobsState(state) || {}).loading;