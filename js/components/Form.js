import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { getRandomIDs } from '../steam';

export class Form extends React.Component {
  constructor(props) {
    super(props);
    this.randomBattle = this.randomBattle.bind(this);
    this.beginBattle = this.beginBattle.bind(this);
  }

  randomBattle(e) {
    e.preventDefault();
    const ids = getRandomIDs();
    this.beginBattle(e, ids);
  }

  beginBattle(e, ids) {
    if (e) e.preventDefault();
    const p1id = ids[0] || this.player1input.value.trim();
    const p2id = ids[1] || this.player2input.value.trim();
    this.props.dispatch(actions.battle([p1id, p2id]));
    window.location.replace('#/battle');
  }

  render() {
    return (
      <form onSubmit={this.beginBattle}>
        <div className="col-3">
          <label htmlFor="player1-input">Player 1</label>
          <input type="text" id="player1-input" ref={(input) => { this.player1input = input; }} />
        </div>
        <div className="col-3">
          <label htmlFor="player2-input">Player 2</label>
          <input type="text" id="player2-input" ref={(input) => { this.player2input = input; }} />
        </div>
        <div className="buttons col-12">
          <button className="button" onClick={this.beginBattle}>Fight</button>
          <button className="button" onClick={this.randomBattle}>Random</button>
        </div>
        <span>
          {this.props.error ? this.props.error.msg : ''}
          {this.props.error ? ` Player ${this.props.error.player}` : ''}
        </span>
      </form>
    );
  }
}

Form.defaultProps = {
  error: null,
};

Form.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  error: React.PropTypes.shape({
    msg: React.PropTypes.string,
    player: React.PropTypes.number,
  }),
};

Form.contextTypes = {
  router: React.PropTypes.object,
};

const mapStateToProps = state => ({
  error: state.error,
});

export default connect(mapStateToProps)(Form);
