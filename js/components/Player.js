import React from 'react';
import { connect } from 'react-redux';
import Score from './Score';

export function Player(props) {
  const { player } = props;
  if (player.profile) {
    return (
      <div id={`player${props.pid}`} className="player col-6 blue">
        <Score score={props.player.score} />
      </div>
    );
  }
  return (<div />);
}

const mapStateToProps = (state, props) => ({
  player: state.players[props.pid],
});

Player.propTypes = {
  pid: React.PropTypes.number.isRequired,
  player: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    score: React.shape({
      owned: React.PropTypes.number.isRequired,
      playtime: React.PropTypes.number.isRequired,
      recent: React.PropTypes.number.isRequired,
      achievements: React.PropTypes.number.isRequired,
      total: React.PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Player);
