/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import Score from '../../js/components/Score';

const should = chai.should();

describe('Score component', () => {
  it('should render a component with props', () => {
    const renderer = TestUtils.createRenderer();
    const score = {
      total: 0,
      owned: 0,
      playtime: 0,
      recent: 0,
    };
    renderer.render(<Score score={score} />);
    const result = renderer.getRenderOutput();
    result.type.should.equal('div');
    result.props.className.should.equal('player-score');
    // TODO What else should I test?
  });
  it('should render a component with default props', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Score />);
    const result = renderer.getRenderOutput();
    result.type.should.equal('div');
    result.props.className.should.equal('player-score');
    result.props.children.type.should.equal('ul');
  });
});

/*

no props { '$$typeof': Symbol(react.element),
  type: 'div',
  key: null,
  ref: null,
  props:
   { className: 'player-score',
     children:
      { '$$typeof': Symbol(react.element),
        type: 'ul',
        key: null,
        ref: null,
        props: [Object],
        _owner: null,
        _store: {} } },
  _owner: null,
  _store: {} }

*/
