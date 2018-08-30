import {
  RENEW_TOKEN,
  RENEW_TOKEN_SUCCESS,
  RENEW_TOKEN_FAILURE,
} from 'symbols/user';

export const actionRenewToken = () => ({
  type: RENEW_TOKEN,
});

export const actionRenewTokenSuccess = data => ({
  type: RENEW_TOKEN_SUCCESS,
  data,
});

export const actionRenewTokenFailure = error => ({
  type: RENEW_TOKEN_FAILURE,
  error,
});