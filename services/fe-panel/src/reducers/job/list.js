import {
  APP_INITIALIZED
} from 'symbols/app';

import {
  LOAD_OWN_JOBS,
  LOAD_OWN_JOBS_SUCCESS,
  LOAD_OWN_JOBS_FAILURE,
  UPDATE_JOB,
} from 'symbols/job';

export default (
  state = {},
  action,
) => {
  switch (action.type) {
    case APP_INITIALIZED:
      return {
        ...state,
        loading: true
      }

    case LOAD_OWN_JOBS:
      return {
        error: null,
        data: null,
        loading: true,
      };

    case LOAD_OWN_JOBS_SUCCESS:
      const data = action.data.sort((a,b) => {
        if (a.id > b.id) return -1;
        if (b.id > a.id) return 1;
        return 0;
      });

      return {
        error: null,
        data,
        loading: false,
      };

    case LOAD_OWN_JOBS_FAILURE:
      return {
        ...state,
        error: action.error,
        data: null,
        loading: false,
      };

    case UPDATE_JOB:
      const indexOfJob = state.data.findIndex(job => job.id === action.data.id);

      state.data = [...state.data];
      state.data[indexOfJob] = action.data;

      return {...state};

    default:
      return state;
  }
};
