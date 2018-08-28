import {
  APP_INITIALIZED
} from 'symbols/app';

import {
  DO_SIGNUP,
  DO_SIGNUP_SUCCESS,
  DO_SIGNUP_FAILURE,
} from 'symbols/user';

export default (
  state = {},
  action,
) => {
  switch (action.type) {
    case APP_INITIALIZED:
      return {
        ...state,
        loading: false
      }
      
    case DO_SIGNUP:
      return {
        error: null,
        info: null,
        loading: true,
      };

    case DO_SIGNUP_SUCCESS:
      return {
        ...state,
        error: null,
        info: action.data,
        loading: false,
      };

    case DO_SIGNUP_FAILURE:
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
