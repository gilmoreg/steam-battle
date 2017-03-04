import { createStore } from 'redux';
import steamBattleReducer from './reducers/index';

export default createStore(steamBattleReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
