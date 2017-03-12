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
    this.props.dispatch(actions.clearState());
    window.location.replace('#/');
  }

  render() {
    return (
      <div className="battle col-12">
        <Player pid={0} />
        <Player pid={1} />
        <button className={'btn'} onClick={this.retry}><span>Battle again!</span></button>
      </div>
    );
  }
}

Battle.defaultProps = {
  dispatch: null,
};

Battle.propTypes = {
  dispatch: React.PropTypes.func,
};

export default connect()(Battle);
