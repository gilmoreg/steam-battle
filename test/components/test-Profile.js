/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import chai from 'chai';
import Profile from '../../js/components/Profile';

const should = chai.should();

describe('Profile component', () => {
  it('should render a component properly', () => {
    const profile = {
      profileurl: 'test',
      personaname: 'test',
      avatarful: 'test',
      avatar: 'test',
    };
    const wrapper = shallow(<Profile pid={0} />);
    wrapper.node.type.should.equal('div');
    wrapper.node.props.className.should.equal('profile');
    wrapper.node.props.children[0].type.should.equal('h3');
    wrapper.node.props.children[1].type.should.equal('p');
  });
});

