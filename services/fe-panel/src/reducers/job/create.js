import {
  CREATE_JOB,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_FAILURE,
} from 'symbols/job';

export default (
  state = {},
  action,
) => {
  switch (action.type) {
    case CREATE_JOB:
      return {
        error: null,
        info: null,
        loading: true,
      };

    case CREATE_JOB_SUCCESS:
      return null;

    case CREATE_JOB_FAILURE:
      return {
        ...state,
        error: action.error,
        info: null,
        loading: false,
      };
      
    default:
      return state;
  }
};
