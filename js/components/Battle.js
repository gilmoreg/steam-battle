import React from 'react';
import { connect } from 'react-redux';
import Player from './Player';
import * as actions from '../actions';

const Loading = () => <h1 className="linear-wipe">Battling...</h1>;
const Result = () => <div><Player pid={0} /> <Player pid={1} /></div>;

export class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.retry = this.retry.bind(this);
    this.loaded = this.loaded.bind(this);
  }

  retry(e) {
    e.preventDefault();
    this.props.dispatch(actions.clearState());
    window.location.replace('#/');
  }

  loaded() {
    return (this.props.ids[0] && this.props.ids[1]);
  }

  render() {
    const loadingStyle = {
      fontSize: '28px',
      opacity: 0.5,
    };
    return (
      <div className="battle col-12">
        { this.loaded() ? <Result /> : <Loading style={loadingStyle} /> }
        { this.loaded() ? <button className={'btn battle-again'} onClick={this.retry}><span>Battle again!</span></button> : '' }
      </div>
    );
  }
}

Battle.defaultProps = {
  ids: [],
  dispatch: null,
};

Battle.propTypes = {
  ids: React.PropTypes.arrayOf(React.PropTypes.number),
  dispatch: React.PropTypes.func,
};

const mapStateToProps = state => ({
  ids: [state.players[0].id, state.players[1].id],
});
export default connect(mapStateToProps)(Battle);
