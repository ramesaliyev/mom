import {
  DO_SIGNIN,
  DO_SIGNIN_SUCCESS,
  DO_SIGNIN_FAILURE,
  DO_SIGNOUT,
} from 'symbols/user';

export const actionDoSignIn = payload => ({
  type: DO_SIGNIN,
  payload,
});

export const actionDoSignInSuccess = data => ({
  type: DO_SIGNIN_SUCCESS,
  data,
});

export const actionDoSignInFailure = error => ({
  type: DO_SIGNIN_FAILURE,
  error,
});

export const actionDoSignOut = () => ({
  type: DO_SIGNOUT,
});