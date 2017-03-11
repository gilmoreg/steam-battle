import React from 'react';
import { connect } from 'react-redux';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

export class PlayerInput extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-3">
        <h3>Player {this.props.pid}</h3>
        <AsyncTypeahead
          labelKey="login"
          onSearch={this._handleSearch}
          options={this.state.options}
          placeholder="Search for a Github user..."
          renderMenuItemChildren={(option, props, index) => (
            <div>
              <span>{option.login}</span>
            </div>
          )}
        />
      </div>
    );
  }

}

export default connect()(PlayerInput);

/*
<input
  type="text"
  id="player-1-input"
  ref={(input) => { this.playerinput[0] = input; }}
  onChange={this.handleChange}
/>
*/
