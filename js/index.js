require('babel-polyfill');
import React from 'react';
import ReactDOM from 'react-dom';
import SteamBattle from './components/steam-battle';

document.addEventListener('DOMContentLoaded', () =>
    ReactDOM.render(
        <SteamBattle />,
        document.getElementById('app')
    )
);