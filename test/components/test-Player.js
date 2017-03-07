/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import { Player } from '../../js/components/Player';
import Profile from '../../js/components/Profile';
import PlaceholderProfile from '../../js/components/PlaceholderProfile';

const should = chai.should();

describe('Player component', () => {
  it('should render a component with props', () => {
    const renderer = TestUtils.createRenderer();
    const player = {
      id: 'test',
      profile: {
        profileurl: 'test',
        personaname: 'test',
        avatarfull: 'test',
      },
      score: {
        owned: 0,
        playtime: 0,
        recent: 0,
        total: 0
      },
    };
    renderer.render(<Player player={player} pid={0} />);
    const result = renderer.getRenderOutput();
    result.type.should.equal('div');
    result.props.className.should.equal('player col-3');
    result.props.id.should.equal('player0');
    result.props.children[0].type.should.equal(Profile);
    // TODO what else
  });
  it('should render a component with default props', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Player pid={0} />);
    const result = renderer.getRenderOutput();
    result.type.should.equal('div');
    result.props.children.type.should.equal(PlaceholderProfile);
    // TODO what else
  });
});
