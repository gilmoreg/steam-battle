import React from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import SteamBattle from './SteamBattle';
import Battle from './Battle';

export default function Root() {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={SteamBattle} />
        <Match exactly pattern="/battle" component={Battle} />
        <Miss component={SteamBattle} />
      </div>
    </BrowserRouter>
  );
}
