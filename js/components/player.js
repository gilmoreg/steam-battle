import React from 'react';

export default function Player(props) {
    return (
        <div id="{props.player.playerid}" class="player col-6 blue">
          <h2>{props.player.winloss || 'Win'}</h2>
            <p>
              <a href="{props.player.profile}"><h3>{props.player.persona}</h3></a>
            </p>
          <img src="{props.player.avatar}" alt="{props.player.persona}" />
          <Score score={props.player.score}/>
        </div>
    );
}