import React from 'react';
import { connect } from 'react-redux';
import Score from './Score';
import Profile from './Profile';
import PlaceholderProfile from './PlaceholderProfile';

export function Player(props) {
  const { player } = props;
  if (player && player.profile) {
    return (
      <div id={`player${props.pid}`} className="player col-3">
        {(props.winner === props.pid) ? 'Winner' : 'Loser'}
        <Profile profile={player.profile} id={props.pid} />
        <Score score={player.score} />
      </div>
    );
  }
  return (
    <div id={`player${props.pid}`} className="player col-3">
      <PlaceholderProfile id={props.pid} />
    </div>
  );
}

Player.defaultProps = {
  player: null,
  winner: 0,
};

Player.propTypes = {
  pid: React.PropTypes.number.isRequired,
  player: React.PropTypes.shape({
    id: React.PropTypes.string,
    profile: React.PropTypes.shape({
      profileurl: React.PropTypes.string,
      personaname: React.PropTypes.string,
      avatarfull: React.PropTypes.string,
      avatar: React.PropTypes.string,
    }),
    score: React.PropTypes.shape({
      owned: React.PropTypes.number,
      playtime: React.PropTypes.number,
      recent: React.PropTypes.number,
      total: React.PropTypes.number,
    }),
  }),
  winner: React.PropTypes.number,
};

const mapStateToProps = (state, props) => ({
  player: state.players[props.pid],
  winner: state.winner,
});

export default connect(mapStateToProps)(Player);
