/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const moxios = require('moxios');
const Steam = require('../js/steam');

const should = chai.should();
chai.use(chaiAsPromised);

const fakeCheckIdGoodResult = {
  steamid: '76561198007908897',
};

const fakeCheckIdBadResult = {
// Returns nothing - is that what I want?
};

const fakeGetPlayerGoodResult = {
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

const fakeGetPlayerBadResult = {

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
  it('checkID should validate a known good id', () =>
    Steam.checkID('76561198007908897').should.fulfill
  );
  it('checkID should validate a known good vanity url', () =>
    Steam.checkID('solitethos').should.fulfill
  );
  it('checkID should fail on a known bad id', () =>
    Steam.checkID('aaaa').should.be.rejected
  );
  it('getPlayer should succeed on a known good id', () =>
    Steam.getPlayer('76561198007908897').should.fulfill
  );
  it('getPlayer should fail on a known bad id', () =>
    Steam.getPlayer('aaaa').should.be.rejected
  );
});
