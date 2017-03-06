/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import steamBattleReducer from './reducers/index';

let reduxDevtools;

if (typeof window !== 'undefined') {
  reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__
  && window.__REDUX_DEVTOOLS_EXTENSION__();
} else {
  reduxDevtools = global.__REDUX_DEVTOOLS_EXTENSION__ &&
  global.__REDUX_DEVTOOLS_EXTENSION__();
}

export default createStore(steamBattleReducer,
  reduxDevtools,
  applyMiddleware(thunk),
);
