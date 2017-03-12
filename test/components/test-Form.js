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
    // TODO what else
    // test if the error displays correctly
    // once I get mocking working, test if the functions fire right
  });
});
