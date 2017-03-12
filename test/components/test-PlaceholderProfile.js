/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import chai from 'chai';
import PlaceholderProfile from '../../js/components/PlaceholderProfile';

const should = chai.should();

describe('PlaceholderProfile component', () => {
  it('should render a component with props', () => {
    const wrapper = shallow(<PlaceholderProfile />);
    wrapper.node.type.should.equal('div');
    wrapper.node.props.className.should.equal('profile');
    wrapper.node.props.id.should.equal('playernull');
  });
});
