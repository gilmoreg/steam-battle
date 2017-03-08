/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import chai from 'chai';
import steamBattleReducer from '../js/reducers';
import * as actions from '../js/actions';

const should = chai.should();
const initialState = {
  players: [{}, {}],
  winner: null,
  error: null,
};

describe('Reducers', () => {
  it('should return the initial state', () => {
    steamBattleReducer(undefined, {}).should.equal.initialState;
  });
});

