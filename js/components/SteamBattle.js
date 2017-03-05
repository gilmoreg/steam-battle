import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import Form from './Form';

export default function SteamBattle(props) {
  return (
    <Provider store={store}>
      {props.children || <Form />}
    </Provider>
  );
}

SteamBattle.defaultProps = {
  children: <Form />,
};

SteamBattle.propTypes = {
  children: React.PropTypes.element,
};
