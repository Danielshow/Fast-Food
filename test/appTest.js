const assert = require('chai').assert;
const app = require('../src/main');

describe('App', () => {
  it('app shoud return hello', ()=>{
    assert.equal(app(), 'Hello')
  })
});
