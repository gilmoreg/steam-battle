/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import chai from 'chai';
import { PlayerInput } from '../../js/components/PlayerInput';
import SmallProfile from '../../js/components/SmallProfile';
import store from '../../js/store';

const should = chai.should();

describe('PlayerInput component', () => {
  it('should render a component', () => {
    const wrapper = shallow(<PlayerInput pid={0} />);
    wrapper.find(SmallProfile).should.have.length(1);
    wrapper.node.type.should.equal('div');
    wrapper.node.props.className.should.equal('player-input col-3');
    wrapper.node.props.children[0].type.should.equal('h3');
  });
});
