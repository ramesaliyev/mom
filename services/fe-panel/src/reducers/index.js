import { combineReducers } from 'redux';

import job from './job';
import user from './user';

const rootReducer = combineReducers({
  job,
  user,
});

export default rootReducer;