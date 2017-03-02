import React from 'react';
import Form from './form';
import Player from './player';

export default class SteamBattle extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='steam-battle'>
                <Form />               
            </div>
        )
    }
}


/**
 * 
 *  <Player player={} />
    <Player player={} />
 * 
player = {
    id,
    winloss,
    profile,
    persona,
    avatar,
    score {
        total,
        games,
        played,
        playtime,
        recent,
        achievements,
        rares,
        superrares
    }
}
 */