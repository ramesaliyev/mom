import { STORAGE_KEY } from './persister';

export default () => {
  let persisted;
  
  try {
    persisted = JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch (e) {}

  return persisted || {};
}