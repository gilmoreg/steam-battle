import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import SteamBattle from './components/SteamBattle';
import Battle from './components/Battle';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Router history={hashHistory}>
      <Route path="/" component={SteamBattle}>
        <Route path="/battle" component={Battle} />
      </Route>
    </Router>,
    document.getElementById('app'),
  );
});
