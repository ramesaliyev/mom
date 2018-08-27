import { combineReducers } from 'redux';

import signIn from './signin';
import signUp from './signup';

export default combineReducers({
  signIn,
  signUp,
});
