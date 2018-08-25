import {
  DO_SIGNIN,
  DO_SIGNIN_SUCCESS,
  DO_SIGNIN_FAILURE,
  DO_SIGNOUT,
} from 'symbols/user';

export default (
  state = {},
  action,
) => {
  switch (action.type) {
    case DO_SIGNIN:
      return {
        error: null,
        info: null,
        loading: true,
      };

    case DO_SIGNIN_SUCCESS:
      return {
        ...state,
        error: null,
        info: action.data,
        loading: true,
      };

    case DO_SIGNIN_FAILURE:
      return {
        ...state,
        error: action.error,
        info: null,
        loading: true,
      };

    case DO_SIGNOUT:
      return {
        ...state,
        error: null,
        info: null,
        loading: false,
      };

    default:
      return state;
  }
};
