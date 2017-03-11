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
            console.log('have a valid ID, dispatching fillID');
            this.props.dispatch(actions.fillID(this.props.pid, player.id));
            this.setState({ profile: player.profile });
          }
        })
        .catch(() => {
          console.log('invalid ID, setting error state');
          this.setState({ error: `${id} not found.` });
        });
    }, 200);
    this.state = {
      error: null,
      profile: null,
    };
  }

  handleChange(e) {
    console.log('handleSearch', e.target.value);
    this.testID(e.target.value);
  }

  render() {
    return (
      <div className="col-3">
        <h3>Player {this.props.pid + 1}</h3>
        <input
          type="text"
          id={`player${this.props.pid + 1}-input`}
          ref={(input) => { this.input = input; }}
          onChange={this.handleChange}
          placeholder="Enter a Steam ID..."
        />
        {this.state.error ? this.state.error : ''}
        {this.state.profile ? <SmallProfile profile={this.state.profile} /> : '' }
      </div>
    );
  }
}

PlayerInput.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  pid: React.PropTypes.number.isRequired,
};

export default connect()(PlayerInput);

/*


*/
