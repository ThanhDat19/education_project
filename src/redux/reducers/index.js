// reducers/index.js

import { combineReducers } from 'redux';
import authReducer from '../reducers/authReducer';

// Kết hợp các reducers thành một rootReducer
const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
