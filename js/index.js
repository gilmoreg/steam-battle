require('babel-polyfill');
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import * as actions from './actions/index';
import store from './store';
import SteamBattle from './components/steam-battle';

document.addEventListener('DOMContentLoaded', () =>
    ReactDOM.render(
        <Provider store={store}>
            <SteamBattle />
        </Provider>,
        document.getElementById('app')
    )
);