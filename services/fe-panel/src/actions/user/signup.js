import {
  DO_SIGNUP,
  DO_SIGNUP_SUCCESS,
  DO_SIGNUP_FAILURE,
} from 'symbols/user';

export const actionDoSignUp = payload => ({
  type: DO_SIGNUP,
  payload,
});

export const actionDoSignUpSuccess = data => ({
  type: DO_SIGNUP_SUCCESS,
  data,
});

export const actionDoSignUpFailure = error => ({
  type: DO_SIGNUP_FAILURE,
  error,
});