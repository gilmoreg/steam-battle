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
};

const fakePlayer = {
  player: {
    id: 'test',
    profile: {
      personaname: 'test',
      profileurl: 'test',
      avatarfull: 'test',
    },
    score: {
      owned: 18,
      playtime: 22305,
      recent: 162,
      total: 391,
    },
  },
};

describe('Reducers', () => {
  it('undefined action should return the initial state', () => {
    steamBattleReducer(initialState,
      { type: undefined })
      .should.eql(initialState);
  });

  it('should clear state', () => {
    const fakeState = {
      players: [fakePlayer, fakePlayer],
      winner: 0,
    };
    steamBattleReducer(fakeState, { type: actions.CLEAR_STATE })
      .should.eql(initialState);
  });

  it('should fill an id on FILL_ID', () => {
    const newFakePlayer = Object.assign({}, fakePlayer);
    newFakePlayer.id = 'test2';
    const expectedStore = {
      players: [newFakePlayer, {}],
      winner: null,
    };
    steamBattleReducer(initialState,
      { type: actions.FILL_ID, player: 0, id: 'test2' })
      .should.equal.expectedStore;
  });

  it('should fill a profile on FILL_PLAYER', () => {
    const expectedStore = {
      players: [fakePlayer, {}],
      winner: null,
    };
    const newStore = steamBattleReducer(initialState,
      { type: actions.FILL_PLAYER, player: 0, data: fakePlayer });
    newStore.should.eql(expectedStore);
  });

  it('should declare a winner on DECLARE_WINNER', () => {
    const expectedStore = {
      players: [{}, {}],
      winner: 0,
    };
    steamBattleReducer(initialState,
      { type: actions.DECLARE_WINNER, winner: 0 })
      .should.equal.expectedStore;
  });

  it('should log an error on ERROR', () => {
    const newFakePlayer = Object.assign({}, fakePlayer);
    newFakePlayer.error = 'error';
    const expectedStore = {
      players: [newFakePlayer, {}],
      winner: null,
    };
    const firstStore = steamBattleReducer(initialState,
      { type: actions.FILL_PLAYER, player: 0, data: fakePlayer });
    const newStore = steamBattleReducer(firstStore,
      { type: actions.ERROR, msg: 'error', player: 0 });
    newStore.should.eql(expectedStore);
  });
});
