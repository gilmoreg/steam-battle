import React from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import { checkID } from '../steam';
import * as actions from '../actions';
import SmallProfile from './SmallProfile';

export class PlayerInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    // Ensure API calls do not happen until user has not typed for 200ms
    this.testID = debounce((id) => {
      this.setState({ error: null });
      checkID(id)
        .then((player) => {
          if (player) {
            this.props.dispatch(actions.fillID(this.props.pid, player.id));
            this.setState({ profile: player.profile });
          }
        })
        .catch(() => {
          this.setState({ error: `${id} not found.`, profile: null });
        });
    }, 200);
    this.state = {
      error: null,
      profile: null,
    };
  }

  handleChange(e) {
    this.testID(e.target.value);
  }

  // {this.state.error ? this.state.error : ''}

  render() {
    return (
      <div className="player-input col-3">
        <h3>Player {this.props.pid + 1}</h3>
        <SmallProfile profile={this.state.profile} />
        <div className="input--wrapper">
          <input
            type="text"
            id={`player${this.props.pid + 1}-input`}
            ref={(input) => { this.input = input; }}
            onChange={this.handleChange}
            placeholder="Enter a Steam ID..."
          />
        </div>
      </div>
    );
  }
}

PlayerInput.defaultProps = {
  dispatch: null,
  pid: null,
};

PlayerInput.propTypes = {
  dispatch: React.PropTypes.func,
  pid: React.PropTypes.number,
};

export default connect()(PlayerInput);
