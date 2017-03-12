/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import chai from 'chai';
import { Form } from '../../js/components/Form';

const should = chai.should();

describe('Form component', () => {
  it('should render a component', () => {
    const wrapper = shallow(<Form />);
    wrapper.node.type.should.equal('form');
    wrapper.node.props.onSubmit.should.be.a.function;
    wrapper.node.props.children[0].type.displayName.should.equal('Connect(PlayerInput)');
    wrapper.node.props.children[1].type.displayName.should.equal('Connect(PlayerInput)');
  });
});
