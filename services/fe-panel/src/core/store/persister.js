export const STORAGE_KEY = '__PERSISTED_STORE__';

export default store => next => action => {
  const nextAction = next(action);
  const state = store.getState();

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {}

  return nextAction;
};
