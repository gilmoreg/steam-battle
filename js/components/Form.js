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
        <PlayerInput pid={0} />
        <PlayerInput pid={1} />
        <div className="buttons col-12">
          <button
            className="button"
            id="fight-button"
            ref={(input) => { this.fightbutton = input; }}
            onClick={this.beginBattle}
            disabled
          >
            Fight
          </button>
          <button className="button" onClick={this.randomBattle}>Random</button>
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
