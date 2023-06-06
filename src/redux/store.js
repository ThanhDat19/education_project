// store.js

import { createStore } from 'redux';
import rootReducer from './reducers';

// Tạo store Redux
const store = createStore(rootReducer);

export default store;
