/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
const chai = require('chai');
const moxios = require('moxios');
const Steam = require('../js/steam');

const should = chai.should();
chai.use(require('chai-as-promised'));

process.on('unhandledRejection', (reason, p) => {
  console.error('unhandledRejection', p, reason);
  process.exit(1);
});

const fakeProfile = {
  player: {
    profile: {
      steamid: '76561198007908897',
      personaname: 'test',
      profileurl: 'test',
      avatarfull: 'test',
    },
    score: {
      steamid: '76561198007908897',
      owned: 18,
      playtime: 22305,
      recent: 162,
      total: 391
    }
  }
};

describe('Steam functions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('getRandomIDs should return two unique random numbers', () => {
    const ids = Steam.getRandomIDs();
    ids.should.be.an.array;
    ids.length.should.equal(2);
    ids[0].should.not.eql(ids[1]);
  });

  it('checkID should validate a known good id', (done) => {
    moxios.stubRequest(/.*(checkid).*/, {
      status: 200,
      responseText: JSON.stringify({ steamid: '76561198007908897' }),
    });
    Steam.checkID('76561198007908897')
      .then((response) => {
        response.should.equal('76561198007908897');
        done();
      })
      .catch(err => should.fail(err));
  });

  it('checkID should validate a known good vanity url', (done) => {
    moxios.stubRequest(/.*(checkid).*/, {
      status: 200,
      responseText: JSON.stringify({ steamid: '76561198007908897' }),
    });
    Steam.checkID('solitethos')
      .then((response) => {
        response.should.equal('76561198007908897');
        done();
      })
      .catch(err => should.fail(err));
  });

  it('checkID should fail on a known bad id', (done) => {
    moxios.stubRequest(/.*(checkid).*/, {
      status: 200,
      responseText: JSON.stringify({}),
    });
    Steam.checkID('aazzzaasff')
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
      responseText: JSON.stringify(fakeProfile),
    });
    Steam.getPlayer('76561198007908897')
      .then((player) => {
        player.should.have.keys(['profile', 'score']);
        player.profile.should.have.keys(['steamid', 'personaname', 'profileurl', 'avatarfull']);
        player.score.should.have.keys(['steamid', 'owned', 'playtime', 'recent', 'total']);
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
    Steam.getPlayer('897asd9f6')
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
