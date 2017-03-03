require('babel-polyfill');
import React from 'react';
import {connect} from 'react-redux';
import Score from './score';

export class Player extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {player} = this.props;
    console.log('Player props',player);
    if(player.profile) {
      return ( 
          <div id={player.profile.steamid} className="player col-6 blue"> 
            <h2><a href={player.profile.profileurl} title={player.profile.personaname} target="_blank">{player.profile.personaname}</a></h2>
            <p>
              <img src={player.profile.avatarfull} alt={player.profile.personaname} title={player.profile.personaname} />
            </p>
            <Score score={this.props.player.score} />
          </div>
      );
    }
    return ( <div></div> );
  }
}

const mapStateToProps = (state, props) => ({
  player: state.players[props.pid]
})

export default connect(mapStateToProps)(Player);