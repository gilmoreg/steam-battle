/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import chai from 'chai';
import SteamBattle from '../../js/components/SteamBattle';
import Form from '../../js/components/Form';

const should = chai.should();

describe('SteamBattle component', () => {
  it('should render the component properly', () => {
    const wrapper = shallow(<SteamBattle />);
    wrapper.find(Provider).should.have.length(1);
    wrapper.find(Form).should.have.length(1);
  });
});
