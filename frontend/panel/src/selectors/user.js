const getUser = state => state.user;

export const getUserSignIn = state => (getUser(state) || {}).signIn;
export const getUserInfo = state => (getUserSignIn(state) || {}).info;

export const isUserLoggedIn = state => !!getUserInfo(state);
export const isUserLoginInProgress = state => !!(getUserSignIn(state).loading);

export const getUserToken = state => (getUserInfo(state) || {}).accessToken;

export const getUserSignUp = state => (getUser(state) || {}).signUp;
export const isUserRegisteringInProgress = state => !!(getUserSignUp(state).loading);