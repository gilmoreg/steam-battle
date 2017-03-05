import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

export class Form extends React.Component {
  constructor(props) {
    super(props);
    this.randomBattle = this.randomBattle.bind(this);
    this.beginBattle = this.beginBattle.bind(this);
  }

  randomBattle(e) {
    e.preventDefault();
    // Until I implement a random list to import
    this.player1input.value = 'solitethos';
    this.player2input.value = '76561198036993658';
    this.beginBattle(e);
  }

  beginBattle(e) {
    if (e) e.preventDefault();
    // Need to validate input if this is called first
    const p1id = this.player1input.value;
    const p2id = this.player2input.value;
    this.props.dispatch(actions.battle([p1id, p2id]));
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
        </span>;
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
