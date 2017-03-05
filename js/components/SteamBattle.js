import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import Form from './Form';
import Player from './Player';

export default function SteamBattle() {
  return (
    <Provider store={store}>
      <div className="steam-battle">
        <Form />
        <Player pid={0} />
        <Player pid={1} />
      </div>
    </Provider>
  );
}
