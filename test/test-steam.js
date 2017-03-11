/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
import chai from 'chai';
import moxios from 'moxios';
import * as Steam from '../js/steam';

const should = chai.should();

const fakePlayer = {
  player: {
    id: 'test',
    profile: {
      personaname: 'test',
      profileurl: 'test',
      avatarfull: 'test',
      avatar: 'test',
    },
    score: {
      owned: 18,
      playtime: 22305,
      recent: 162,
      total: 391
    },
  },
};

describe('Steam functions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('getRandomIDs should return two unique random numbers', () => {
    const ids = Steam.getRandomIDs();
    ids.should.be.an.array;
    ids.length.should.equal(2);
    ids[0].should.not.eql(ids[1]);
  });

  it('checkID should validate a known good id', (done) => {
    moxios.stubRequest(/.*(checkid).*/, {
      status: 200,
      responseText: JSON.stringify({ id: 'test', profile: fakePlayer.player.profile }),
    });
    Steam.checkID('test')
      .then((response) => {
        response.should.have.keys(['id', 'profile']);
        response.id.should.equal('test');
        response.profile.should.have.keys(['personaname', 'profileurl', 'avatarfull', 'avatar']);
        done();
      })
      .catch(err => should.fail(err));
  });

  it('checkID should validate a known good vanity url', (done) => {
    moxios.stubRequest(/.*(checkid).*/, {
      status: 200,
      responseText: JSON.stringify({ id: 'test', profile: fakePlayer.player.profile }),
    });
    Steam.checkID('test')
      .then((response) => {
        response.should.have.keys(['id', 'profile']);
        response.id.should.equal('test');
        response.profile.should.have.keys(['personaname', 'profileurl', 'avatarfull', 'avatar']);
        done();
      })
      .catch(err => should.fail(err));
  });

  it('checkID should fail on a known bad id', (done) => {
    moxios.stubRequest(/.*(checkid).*/, {
      status: 200,
      responseText: JSON.stringify({}),
    });
    Steam.checkID('test')
      .then(() => {
        should.fail();
        done();
      })
      .catch((err) => {
        err.should.exist;
        done();
      });
  });

  it('getPlayer should succeed on a known good id', (done) => {
    moxios.stubRequest(/.*(player).*/, {
      status: 200,
      responseText: JSON.stringify(fakePlayer),
    });
    Steam.getPlayer('test')
      .then((player) => {
        player.should.have.keys(['id', 'profile', 'score']);
        player.profile.should.have.keys(['personaname', 'profileurl', 'avatarfull', 'avatar']);
        player.score.should.have.keys(['owned', 'playtime', 'recent', 'total']);
        done();
      })
      .catch(() => {
        should.fail();
        done();
      });
  });

  it('getPlayer should fail on a known bad id', (done) => {
    moxios.stubRequest(/.*(player).*/, {
      status: 500,
      responseText: JSON.stringify({ error: 'not found' }),
    });
    Steam.getPlayer('test')
      .then(() => {
        should.fail();
        done();
      })
      .catch((err) => {
        err.should.exist;
        done();
      });
  });
});
