import React from 'react';
import Form from './Form';
import { Player } from './Player';

export default function SteamBattle() {
  return (
    <div className="steam-battle">
      <Form />
      <Player pid={0} />
      <Player pid={1} />
    </div>
  );
}
