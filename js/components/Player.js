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
        <Profile profile={player.profile} />
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
};

Player.propTypes = {
  pid: React.PropTypes.number.isRequired,
  player: React.PropTypes.shape({
    id: React.PropTypes.number,
    score: React.PropTypes.shape({
      owned: React.PropTypes.number,
      playtime: React.PropTypes.number,
      recent: React.PropTypes.number,
      achievements: React.PropTypes.number,
      total: React.PropTypes.number,
    }),
  }),
};

const mapStateToProps = (state, props) => ({
  player: state.players[props.pid],
});

export default connect(mapStateToProps)(Player);
