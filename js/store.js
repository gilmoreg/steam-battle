import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import steamBattleReducer from './reducers/index';

export default createStore(steamBattleReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk),
);
