import React from 'react';

/*
const STEAM_API_KEY='2917D94AAC5A277FACFECDCA153702E5';
export const getIdFromVanity = (player, vanity) => dispatch => {
    const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${STEAM_API_KEY}&vanityurl=${vanity}`;
    return fetch(url).then(response => {
        if(response.response.steamid) dispatch(setSteamID(player,response.response.steamid));
        else dispatch(steamError('getIdFromVanity error: invalid response'));
    })
    .catch(error => {
        dispatch(steamError('getIdFromVanity error' + error));
    });
}
*/



export default function Form(props) {
    return (
        <form action="/battle">
          <div className="col-3 blue">
            <label htmlFor="player1-input">Player 1</label>
            <input type="text" id="player1-input" />
          </div>
          <div className="col-3 blue">
            <label htmlFor="player2-input">Player 2</label>
            <input type="text" id="player2-input" />
          </div>
          <div className="buttons col-12">
            <button type="submit" className="button">Fight</button>
            <button className="button">Random</button>
          </div>
        </form>
    );
}