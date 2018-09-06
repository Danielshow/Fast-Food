import { assert } from 'chai';

describe('App', () => {
  it('app shoud return hello', () => {
    assert.equal(app(), 'Hello');
  });
});
