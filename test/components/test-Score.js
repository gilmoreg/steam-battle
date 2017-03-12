/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import chai from 'chai';
import Score from '../../js/components/Score';

const should = chai.should();

describe('Score component', () => {
  const score = {
    total: 0,
    owned: 0,
    playtime: 0,
    recent: 0,
  };

  it('should render a component with props', () => {
    const wrapper = shallow(<Score score={score} />);
    wrapper.node.type.should.equal('div');
    wrapper.node.props.className.should.equal('player-score');
    wrapper.node.props.children.type.should.equal('ul');
    wrapper.node.props.children.props.className.should.equal('score-list');
  });
  it('should render a component with default props', () => {
    const wrapper = shallow(<Score />);
    wrapper.node.type.should.equal('div');
    wrapper.node.props.className.should.equal('player-score');
    wrapper.node.props.children.type.should.equal('ul');
    wrapper.node.props.children.props.className.should.equal('score-list');
  });
});
