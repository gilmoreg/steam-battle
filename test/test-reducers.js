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

const fakePlayer = {
  player: {
    profile: {
      steamid: 'test1',
      personaname: 'test',
      profileurl: 'test',
      avatarfull: 'test',
    },
    score: {
      steamid: 'test1',
      owned: 18,
      playtime: 22305,
      recent: 162,
      total: 391,
    },
  },
};

describe('Reducers', () => {
  it('should return the initial state', () => {
    steamBattleReducer(undefined, {})
      .should.equal.initialState;
  });

  it('should fill a profile on FILL_PROFILE', () => {
    const expectedStore = {
      players: [fakePlayer, {}],
      winner: null,
      error: null,
    };
    steamBattleReducer(actions.FILL_PLAYER, fakePlayer, 0)
      .should.equal.expectedStore;
  });

  it('should declar a winner on DECLARE_WINNER', () => {
    const expectedStore = {
      players: [{}, {}],
      winner: 0,
      error: null,
    };
    steamBattleReducer(actions.DECLARE_WINNER, 0)
      .should.equal.expectedStore;
  });

  it('should log an error on ERROR', () => {
    const expectedStore = {
      players: [{}, {}],
      winner: null,
      error: 'test',
    };
    steamBattleReducer(actions.ERROR, 'test')
      .should.equal.expectedStore;
  });
});
