/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import chai from 'chai';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../js/actions';

const should = chai.should();
const mockStore = configureMockStore([thunk]);

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

const fakePlayer2 = Object.assign({}, fakePlayer,
  {
    player: {
      profile: { steamid: 'test2' },
      score: { steamid: 'test2', owned: 19 }, // to make the score differ
    },
  },
);

describe('Actions', () => {
  it('should create an action to fill a Player component', () => { 
    const id = 0;
    const player = fakePlayer;
    const expectedAction = {
      type: actions.FILL_PLAYER,
      player,
      id,
    };
    actions.fillPlayer(player, id).should.eql(expectedAction);
  });

  it('should create an action to register an error message', () => {
    const msg = 'error';
    const player = 0;
    const expectedAction = {
      type: actions.ERROR,
      msg,
      player,
    };
    actions.error(msg, player).should.eql(expectedAction);
  });

  it('should create an action to declare a winner', () => {
    const winner = 0;
    const expectedAction = {
      type: actions.DECLARE_WINNER,
      winner,
    };
    actions.declareWinner(winner).should.eql(expectedAction);
  });
});

describe('Async Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should create an action to initiate a battle between two players', () => {
    moxios.stubRequest(/.*(player\/test1).*/, {
      status: 200,
      responseText: JSON.stringify(fakePlayer),
    });
    moxios.stubRequest(/.*(player\/test2).*/, {
      status: 200,
      responseText: JSON.stringify(fakePlayer2),
    });

    const ids = [0, 1];
    const expectedActions = [
      { type: actions.FILL_PLAYER, player: fakePlayer, id: 0 },
      { type: actions.FILL_PLAYER, player: fakePlayer2, id: 1 },
      { type: actions.DECLARE_WINNER, winner: 1 },
    ];
    const initialState = {
      players: [{}, {}],
      winner: null,
      error: null,
    };
    const store = mockStore(initialState);
    return store.dispatch(actions.battle(ids))
      .then(() => {
        store.getActions().should.eql(expectedActions);
      })
      .catch(() => {
        should.fail();
      });
  });
});
