/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import chai from 'chai';
import { Battle } from '../../js/components/Battle';
// import { Player } from '../../js/components/Player';
import store from '../../js/store';

chai.should();

describe('Battle component', () => {
  it('should render a component', () => {
    const wrapper = shallow(<Battle />);
    wrapper.node.type.should.equal('div');
    wrapper.node.props.className.should.equal('battle col-12');
    wrapper.node.props.children[0].type.displayName.should.equal('Connect(Player)');
    wrapper.node.props.children[1].type.displayName.should.equal('Connect(Player)');
  });
});
