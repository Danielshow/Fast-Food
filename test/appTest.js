const { assert } = require('chai');
const fetch = require('node-fetch');

const url = 'http://localhost:3000/api/v1';

describe('Get orders', () => {
  it('Expected Array', () => {
    fetch(`${url}/orders`).then(data => data.json()).then((json) => {
      assert.typeOf(json, 'Array');
    });
  });

  it('Expected One array (Length 1)', () => {
    fetch(`${url}/orders/7`).then(data => data.json()).then((json) => {
      assert.typeOf(json, 'Object');
    });
  });
});
