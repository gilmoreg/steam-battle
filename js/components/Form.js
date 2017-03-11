import React from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import { Typeahead } from 'react-bootstrap-typeahead';
import * as actions from '../actions';
import { getRandomIDs } from '../steam';

export class Form extends React.Component {
  constructor(props) {
    super(props);
    this.randomBattle = this.randomBattle.bind(this);
    this.beginBattle = this.beginBattle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.playerinput = [];
    // Ensure API calls do not happen until user has not typed for 500ms
    this.checkID = debounce((id) => {
      this.props.dispatch(actions.getID(id, this.playerinput[id].value.trim()));
    }, 150);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.errors[0]) {
      // red border
    }
    if (nextProps.errors[1]) {
      // red border
    }
    // if we have both ids, enable the fight button;
    // otherwise keep it disabled in case the user changes from
    // a valid input to an invalid one
    if (this.props.ids[0] && this.props.ids[1]) {
      console.log('got both ids');
      this.fightbutton.disabled = false;
    } else this.fightbutton.disabled = true;
  }

  randomBattle(e) {
    e.preventDefault();
    this.props.dispatch(actions.clearState());
    const ids = getRandomIDs();
    this.props.dispatch(actions.battle([ids[0], ids[1]]));
    window.location.replace('#/battle');
  }

  beginBattle(e) {
    e.preventDefault();
    if (this.props.ids[0] && this.props.ids[1]) {
      this.props.dispatch(actions.battle([this.props.ids[0], this.props.ids[1]]));
      window.location.replace('#/battle');
    }
  }

  handleChange(e) {
    const id = e.target.id.split('-')[1] - 1;
    this.props.dispatch(actions.clearError(id));
    // If there have been no changes for 500ms, call API to check input
    this.checkID(id);
    // if we have both ids, enable the fight button;
    // otherwise keep it disabled in case the user changes from
    // a valid input to an invalid one
    if (this.props.ids[0] && this.props.ids[1]) {
      console.log('got both ids');
      this.fightbutton.disabled = false;
    } else this.fightbutton.disabled = true;
  }

  render() {
    return (
      <form onSubmit={this.beginBattle}>
        <div className="col-3">
          <label htmlFor="player1-input">Player 1</label>
          <input
            type="text"
            id="player-1-input"
            ref={(input) => { this.playerinput[0] = input; }}
            onChange={this.handleChange}
          />
          {this.props.errors[0] || ''}
        </div>
        <div className="col-3">
          <label htmlFor="player2-input">Player 2</label>
          <input
            type="text"
            id="player-2-input"
            ref={(input) => { this.playerinput[1] = input; }}
            onChange={this.handleChange}
          />
          {this.props.errors[1] || ''}
        </div>
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
  errors: [null, null],
  ids: [null, null],
};

Form.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  ids: React.PropTypes.arrayOf(React.PropTypes.string),
  errors: React.PropTypes.arrayOf(React.PropTypes.string),
};

const mapStateToProps = state => ({
  ids: [state.players[0].id, state.players[1].id],
  errors: [state.players[0].error, state.players[1].error],
});

export default connect(mapStateToProps)(Form);
