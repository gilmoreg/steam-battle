import React from 'react';
import { connect } from 'react-redux';
import Player from './Player';
import * as actions from '../actions';

export class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.retry = this.retry.bind(this);
  }

  retry(e) {
    e.preventDefault();
    console.log('Clearing state', this.props);
    this.props.dispatch(actions.clearState());
    window.location.replace('#/');
  }

  render() {
    return (
      <div className="battle col-12">
        <Player pid={0} />
        <Player pid={1} />
        <button onClick={this.retry}>Battle again!</button>
      </div>
    );
  }
}

Battle.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
};

export default connect()(Battle);
