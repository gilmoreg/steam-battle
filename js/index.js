require('babel-polyfill');
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import * as actions from './actions/index';
import store from './store';
import SteamBattle from './components/steam-battle';
import axios from 'axios';
// Wake up the Steam Battle API
axios('https://protected-dusk-95868.herokuapp.com');

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Provider store={store}>
            <SteamBattle props={store} />
        </Provider>,
        document.getElementById('app')
    )
});