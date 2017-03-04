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
        <Profile player={player.profile} />
        <Score score={player.score} />
      </div>
    );
  }
  return (<PlaceholderProfile id={props.pid} />);
}

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
    }).isRequired,
  }),
};

const mapStateToProps = (state, props) => ({
  player: state.players[props.pid],
});

export default connect(mapStateToProps)(Player);
