/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import { Form } from '../../js/components/Form';

const should = chai.should();

describe('Form component', () => {
  it('should render a component', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Form />);
    const result = renderer.getRenderOutput();
    result.type.should.equal('form');
    // TODO what else
    // test if the error displays correctly
    // once I get mocking working, test if the functions fire right
  });
});
