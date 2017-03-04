import React from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import SteamBattle from './SteamBattle';

export default function Root() {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={SteamBattle} />
        <Miss component={SteamBattle} />
      </div>
    </BrowserRouter>
  );
}
