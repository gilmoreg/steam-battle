/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import { shallow } from 'enzyme';
import SmallProfile from '../../js/components/SmallProfile';

const should = chai.should();

describe('SmallProfile component', () => {
  it('should render a component with props', () => {
    const profile = {
      profileurl: 'test',
      personaname: 'test',
      avatarfull: 'test',
      avatar: 'test',
    };
    const wrapper = shallow(<SmallProfile profile={profile} />);
    console.log('smallprofile wrapper', JSON.stringify(wrapper));
    // TODO What to test?
  });
});

