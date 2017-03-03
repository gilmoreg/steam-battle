import React from 'react';

export default function Score(props) {
    return (
        <div className="player-score">
            <ul class="score-list">
              <li>Total Score: {props.score.total}</li>
              <hr />
              <li>Games Owned: {props.score.games}</li>
              <li>Games Played: {props.score.played}</li>
              <li>Total Playtime: {props.score.playtime}</li>
              <li>Recent Playtime: {props.score.recent} </li>
              <li>Achievements: {props.score.achievements}</li>
            </ul>
        </div>
    );
}