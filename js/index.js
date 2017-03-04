import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import store from './store';
import SteamBattle from './components/Steam-battle';

// Wake up the Steam Battle API
axios('https://protected-dusk-95868.herokuapp.com');

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <SteamBattle props={store} />
    </Provider>,
    document.getElementById('app'),
  );
});
