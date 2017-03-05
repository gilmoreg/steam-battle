import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import SteamBattle from './components/SteamBattle';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Router history={hashHistory}>
      <Route path="/" component={SteamBattle} />
    </Router>,
    document.getElementById('app'),
  );
});
