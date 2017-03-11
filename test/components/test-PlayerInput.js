/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import chai from 'chai';
import PlayerInput from '../../js/components/PlayerInput';
import store from '../../js/store';

const should = chai.should();

describe('PlayerInput component', () => {
  it('should render a component', () => {
    const wrapper = shallow(<PlayerInput />, { context: { store } });
    // tests
  });
});
