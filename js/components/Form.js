import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { getRandomIDs } from '../steam';

export class Form extends React.Component {
  constructor(props) {
    super(props);
    this.randomBattle = this.randomBattle.bind(this);
    this.beginBattle = this.beginBattle.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillUpdate(nextProps /* , nextState */) {
    // console.log('Form componentWillUpdate', this.props, nextProps, nextState);
    if (nextProps.errors[0]) {
      this.player1input.value = '';
      this.player1input.placeholder = nextProps.errors[0];
      // red border
    }
    if (nextProps.errors[1]) {
      this.player2input.value = '';
      this.player2input.placeholder = nextProps.errors[1];
      // red border
    }
  }

  randomBattle(e) {
    e.preventDefault();
    this.beginBattle(e, getRandomIDs());
  }

  beginBattle(e, ids) {
    e.preventDefault();
    const p1id = ids[0] || this.player1input.value.trim();
    const p2id = ids[1] || this.player2input.value.trim();
    this.props.dispatch(actions.getID(0, p1id));
    this.props.dispatch(actions.getID(1, p2id));
    if (this.props.ids[0] && this.props.ids[1]) {
      this.props.dispatch(actions.battle([p1id, p2id]));
      window.location.replace('#/battle');
    }
  }

  handleChange(e) {
    const id = e.target.id.split('-')[1];
    this.props.dispatch(actions.clearError(id - 1));
  }

  render() {
    return (
      <form onSubmit={this.beginBattle}>
        <div className="col-3">
          <label htmlFor="player1-input">Player 1</label>
          <input
            type="text"
            id="player-1-input"
            ref={(input) => { this.player1input = input; }}
            onChange={this.handleChange}
          />
        </div>
        <div className="col-3">
          <label htmlFor="player2-input">Player 2</label>
          <input
            type="text"
            id="player-2-input"
            ref={(input) => { this.player2input = input; }}
            onChange={this.handleChange}
          />
        </div>
        <div className="buttons col-12">
          <button
            className="button"
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
  error: null,
  ids: null,
};

Form.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  ids: React.PropTypes.arrayOf(React.PropTypes.number),
};

Form.contextTypes = {
  router: React.PropTypes.object,
};

const mapStateToProps = state => ({
  ids: [state.players[0].id, state.players[1].id],
  errors: [state.players[0].error, state.players[1].error],
});

export default connect(mapStateToProps)(Form);
