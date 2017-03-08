/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
const chai = require('chai');
const moxios = require('moxios');
const Steam = require('../js/steam');
const fakes = require('./fakes');

const should = chai.should();
chai.use(require('chai-as-promised'));

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
      responseText: JSON.stringify(fakes.checkIdGoodResult),
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
      responseText: JSON.stringify(fakes.checkIdGoodResult),
    });
    Steam.checkID('solitethos')
      .then((response) => {
        response.should.equal('76561198007908897');
        done();
      })
      .catch(err => should.fail(err));
  });

  it('checkID should fail on a known bad id', () => {
    moxios.stubRequest(/.*(checkid).*/, {
      status: 200,
      responseText: JSON.stringify({}),
    });
    return Steam.checkID('aazzzaasff').should.be.rejected;
  });   /*
  it('getPlayer should succeed on a known good id', () =>
    Steam.getPlayer('76561198007908897').should.fulfill
  );
  it('getPlayer should fail on a known bad id', () =>
    Steam.getPlayer('aaaa').should.be.rejected
  ); */
});
