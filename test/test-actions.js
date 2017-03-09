/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import chai from 'chai';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../js/actions';

const should = chai.should();
const mockStore = configureMockStore([thunk]);

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

const fakePlayer2 = {
  player: {
    id: 'test2',
    profile: {
      personaname: 'test',
      profileurl: 'test',
      avatarfull: 'test',
    },
    score: {
      owned: 1,
      playtime: 0,
      recent: 0,
      total: 0,
    },
  },
};

const initialState = {
  players: [{}, {}],
  winner: null,
  error: null,
};

describe('Actions', () => {
  it('should create an action to fill an ID', () => {
    const player = 0;
    const id = 'test';
    const expectedAction = {
      type: actions.FILL_ID,
      player,
      id,
    };
    actions.fillID(player, id).should.eql(expectedAction);
  });

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

  it('should create an action to verify a Steam ID', (done) => {
    moxios.stubRequest(/.*(checkid).*/, {
      status: 200,
      responseText: JSON.stringify({ steamid: '0000' }),
    });
    const expectedActions = JSON.stringify(
      [{ type: actions.FILL_ID, player: 0, id: '0000' }],
    );
    const store = mockStore(initialState);
    store.dispatch(actions.getID(0, 'test'))
      .then((res) => {
        const actualActions = JSON.stringify(store.getActions());
        actualActions.should.equal(expectedActions);
        done();
      })
      .catch((err) => {
        console.log('getID test failed', err);
        should.fail();
        done();
      });
  });

  it('should create an action to initiate a battle between two players', (done) => {
    moxios.stubRequest(/.*(player\/test1).*/, {
      status: 200,
      responseText: JSON.stringify(fakePlayer),
    });
    moxios.stubRequest(/.*(player\/test2).*/, {
      status: 200,
      responseText: JSON.stringify(fakePlayer2),
    });
    const ids = ['test1', 'test2'];
    const expectedActions = JSON.stringify([
      { type: actions.FILL_PLAYER, player: fakePlayer.player, id: 0 },
      { type: actions.FILL_PLAYER, player: fakePlayer2.player, id: 1 },
      { type: actions.DECLARE_WINNER, winner: 0 },
    ]);
    const store = mockStore(initialState);
    store.dispatch(actions.battle(ids))
      .then(() => {
        const actualActions = JSON.stringify(store.getActions());
        actualActions.should.equal(expectedActions);
        done();
      })
      .catch((err) => {
        console.log('test failed', err);
        should.fail();
        done();
      });
  });
});
