import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { getRandomIDs } from '../steam';
import PlayerInput from './PlayerInput';

export class Form extends React.Component {
  constructor(props) {
    super(props);
    this.randomBattle = this.randomBattle.bind(this);
    this.beginBattle = this.beginBattle.bind(this);
    const self = this;
    this.readyCheck = (() => {
      if (self.props.ids[0] && self.props.ids[1]) {
        self.fightbutton.disabled = false;
      } else self.fightbutton.disabled = true;
    });
    this.interval = null;
  }

  componentDidMount() {
    this.interval = setInterval(this.readyCheck, 250);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  randomBattle(e) {
    e.preventDefault();
    this.props.dispatch(actions.clearState());
    const ids = getRandomIDs();
    this.props.dispatch(actions.battle([ids[0], ids[1]]));
    clearInterval(this.interval);
    window.location.replace('#/battle');
  }

  beginBattle(e) {
    e.preventDefault();
    if (this.props.ids[0] && this.props.ids[1]) {
      this.props.dispatch(actions.battle([this.props.ids[0], this.props.ids[1]]));
      clearInterval(this.readyCheck);
      window.location.replace('#/battle');
    }
  }

  render() {
    return (
      <form onSubmit={this.beginBattle}>
        <p>Steam is a digitial distribution platform used by millions of gamers across multiple platforms. Players can maintain a profile which tracks which games they own, how long they have spent playing, which achievements they have earned, and so on. Steam Battle makes this publicly available data into a contest: who has the most games and has played the most hours?</p>
        <p>To use Steam Battle, enter two Steam players by ID (32bit, 64bit, ID3, or custom URL). Steam Battle will let you know as you type whether you have a valid ID.</p>
        <p>If you need help finding your Steam ID, please visit <a href="https://steamid.xyz/" rel="noopener noreferrer" target="_blank">Steam ID Finder</a>.</p>
        <p>If you do not know any Steam players you can hit <em>Random</em> to initiate a random battle.</p>
        <PlayerInput pid={0} />
        <PlayerInput pid={1} />
        <div className="buttons col-12">
          <button
            className="btn"
            id="fight-button"
            ref={(input) => { this.fightbutton = input; }}
            onClick={this.beginBattle}
            disabled
          >
            <span>Fight</span>
          </button>
          <button className="btn" onClick={this.randomBattle}><span>Random</span></button>
        </div>
      </form>
    );
  }
}

Form.defaultProps = {
  dispatch: null,
  ids: [null, null],
};

Form.propTypes = {
  dispatch: React.PropTypes.func,
  ids: React.PropTypes.arrayOf(React.PropTypes.string),
};

const mapStateToProps = state => ({
  ids: [state.players[0].id, state.players[1].id],
});

export default connect(mapStateToProps)(Form);
