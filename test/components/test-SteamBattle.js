/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import SteamBattle from '../../js/components/SteamBattle';

const should = chai.should();

describe('SteamBattle component', () => {
  it('should render the component properly', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<SteamBattle />);
    const result = renderer.getRenderOutput();
    result.type.should.equal('Provider');
  });
});

