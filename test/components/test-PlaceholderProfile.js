/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import PlaceholderProfile from '../../js/components/PlaceholderProfile';

const should = chai.should();

describe('PlaceholderProfile component', () => {
  it('should render a component with props', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<PlaceholderProfile id={0} />);
    const result = renderer.getRenderOutput();
    result.type.should.equal('div');
    result.props.className.should.equal('profile');
    result.props.id.should.equal('player0');
    // TODO what else
  });
});
