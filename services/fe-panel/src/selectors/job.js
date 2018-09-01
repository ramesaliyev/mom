const getJobState = state => state.job;

const getJobCreateState = (state) => (getJobState(state) || {}).create;
export const isJobCreationInProgress = (state) => (getJobCreateState(state) || {}).loading;