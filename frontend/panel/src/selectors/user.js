const getUser = state => state.user;

export const getUserInfo = state => {
  const user = getUser(state);
  return user && user.signIn && user.signIn.info;
};

export const isUserLoggedIn = state => !!getUserInfo(state);

export const getUserToken = state => {
  const userInfo = getUserInfo(state);
  return userInfo && userInfo.accessToken;
};