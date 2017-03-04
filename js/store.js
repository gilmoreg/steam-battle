import { createStore } from 'redux';
import * as reducers from './reducers/index';

export default createStore(reducers.steamBattleReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
