import React from 'react';
import Form from './Form';
import Player from './Player';

export default class SteamBattle extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='steam-battle'>
                <Form />
                <Player pid="0" />
                <Player pid="1" />
            </div>
        )
    }
}
