import React from 'react';
import Player from './Player';

export default function Battle() {
  const retry = (e) => {
    e.preventDefault();
    // this.context.router.transitionTo('/');
  };

  return (
    <div>
      <Player pid={0} />
      <Player pid={1} />
      <button onClick={retry}>Battle again!</button>
    </div>
  );
}
/*
Battle.contextTypes = {
  router: React.PropTypes.object,
};
*/
