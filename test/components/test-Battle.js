/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import chai from 'chai';
import Battle from '../../js/components/Battle';
import { Player } from '../../js/components/Player';
import store from '../../js/store';

const should = chai.should();

describe('Battle component', () => {
  it('should render a component', () => {
    const wrapper = shallow(<Battle />, { context: { store } });
    wrapper.node.type.should.equal('div');
    wrapper.node.props.className.should.equal('battle col-12');
    // TODO what else
    // once I get mocking working, test if the button fires right
  });
});
