import React from 'react';

export default function Score(props) {
  if (props.score) {
    return (
      <div className="player-score">
        <ul className="score-list">
          <li>Total Score: {props.score.total}</li>
          <hr />
          <li>Games Owned: {props.score.owned}</li>
          <li>Total Playtime: {Number.parseInt(props.score.playtime/60, 10)} hours</li>
          <li>Recent Playtime: {Number.parseInt(props.score.recent/60, 10)} hours</li>
          <li>Achievements: {props.score.achievements}</li>
        </ul>
      </div>
    );
  }
  return (<div />);
}
