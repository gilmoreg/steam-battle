/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import chai from 'chai';
import { Player } from '../../js/components/Player';
import Profile from '../../js/components/Profile';
import Score from '../../js/components/Score';
import PlaceholderProfile from '../../js/components/PlaceholderProfile';

const should = chai.should();

describe('Player component', () => {
  it('should render a component with props', () => {
    const player = {
      id: 'test',
      profile: {
        profileurl: 'test',
        personaname: 'test',
        avatarfull: 'test',
        avatar: 'test',
      },
      score: {
        owned: 0,
        playtime: 0,
        recent: 0,
        total: 0
      },
    };
    const wrapper = shallow(<Player pid={0} player={player} winner={1} />);
    wrapper.node.type.should.equal('div');
    wrapper.node.props.id.should.equal('player0');
    wrapper.node.props.className.should.equal('player col-3');
    wrapper.node.props.children[0].should.equal('Loser');
  });
  it('should render a component with default props', () => {
    const wrapper = shallow(<Player pid={0} />);
    wrapper.node.type.should.equal('div');
    wrapper.node.props.id.should.equal('player0');
    wrapper.node.props.className.should.equal('player col-3');
    wrapper.find(PlaceholderProfile).should.have.length(1);
  });
});
