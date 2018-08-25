export const STORAGE_KEY = '__PERSISTED_STORE__';

export default store => next => action => {
  const nextState = next(action);
  const state = store.getState();

  try {
    localStorage.addItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {}

  return nextState;
};
