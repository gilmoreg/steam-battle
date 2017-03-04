import React from 'react';
import { connect } from 'react-redux';
import Score from './Score';
import Profile from './Profile';
import PlaceholderProfile from './PlaceholderProfile';

export function Player(props) {
  const { player } = props;
  if (player && player.profile) {
    return (
      <div id={`player${props.pid}`} className="player col-6 blue">
        <Profile profile={player.profile} />
        <Score score={player.score} />
      </div>
    );
  }
  return (
    <div id={`player${props.pid}`} className="player col-6 blue">
      <PlaceholderProfile id={props.pid} />
    </div>
  );
}
/*
Player.defaultProps = {
  player: null,
};

Player.propTypes = {
  pid: React.PropTypes.number.isRequired,
  player: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    score: React.PropTypes.shape({
      owned: React.PropTypes.number.isRequired,
      playtime: React.PropTypes.number.isRequired,
      recent: React.PropTypes.number.isRequired,
      achievements: React.PropTypes.number.isRequired,
      total: React.PropTypes.number.isRequired,
    }),
  }),
};*/

const mapStateToProps = (state, props) => ({
  player: state.players[props.pid],
});

export default connect(mapStateToProps)(Player);
