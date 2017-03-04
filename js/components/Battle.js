import React from 'react';
import Player from './Player';

export default function Battle() {
  return (
    <div>
      <Player pid={0} />
      <Player pid={1} />
    </div>
  );
}
