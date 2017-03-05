import React from 'react';
import { connect } from 'react-redux';
import battle from '../steam';

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
    // Call the Steam service
    battle(p1id, p2id, this.props.dispatch);
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
      </form>
    );
  }
}

Form.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
};

Form.contextTypes = {
  router: React.PropTypes.object,
};

export default connect()(Form);
