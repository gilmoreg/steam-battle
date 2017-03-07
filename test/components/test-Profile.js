/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import Profile from '../../js/components/Profile';

const should = chai.should();

describe('Profile component', () => {
  it('should render a component properly', () => {
    const renderer = TestUtils.createRenderer();
    const profile = {
      profileurl: 'test',
      personaname: 'test',
      avatarful: 'test',
    };
    renderer.render(<Profile profile={profile} />);
    const result = renderer.getRenderOutput();
    result.type.should.equal('div');
    result.props.className.should.equal('profile');
  });
});

/*
Profile { '$$typeof': Symbol(react.element),
  type: 'div',
  key: null,
  ref: null,
  props:
   { className: 'profile',
     children: [ [Object], [Object] ] },
  _owner: null,
  _store: {} }

*/
