import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import Form from './Form';
import Battle from './Battle';

export default function SteamBattle() {
  return (
    <Provider store={store}>
      <div className="steam-battle">
        <Form />
        <Battle />
      </div>
    </Provider>
  );
}
