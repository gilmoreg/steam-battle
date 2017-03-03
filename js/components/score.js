require('babel-polyfill');
import React from 'react';

export default function Score(props) {
    if(props.score) {
        return (
            <div className="player-score">
                <ul className="score-list">
                    <li>Total Score: {props.score.total}</li>
                    <hr />
                    <li>Games Owned: {props.score.owned}</li>
                    <li>Total Playtime: {props.score.playtime}</li>
                    <li>Recent Playtime: {props.score.recent} </li>
                    <li>Achievements: {props.score.achievements}</li>
                </ul>
            </div>
        );
    }
    return ( <div></div> );
}