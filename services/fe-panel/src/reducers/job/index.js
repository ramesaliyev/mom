import { combineReducers } from 'redux';

import create from './create';
import list from './list';

export default combineReducers({
  create,
  list,
});
