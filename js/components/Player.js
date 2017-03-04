import React from 'react';
import { connect } from 'react-redux';
import Score from './Score';

export class Player extends React.Component {

  render() {
    const { player } = this.props;
    if (player.profile) {
      return (
        <div id={`player${this.props.pid}`} className="player col-6 blue">
          <Score score={this.props.player.score} />
        </div>
      );
    }
    return (<div />);
  }
}

const mapStateToProps = (state, props) => ({
  player: state.players[props.pid],
});

export default connect(mapStateToProps)(Player);
