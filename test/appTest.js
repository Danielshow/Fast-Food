// import { assert } from 'chai';
// import fetch from 'node-fetch';
const assert = require('chai').assert;
const fetch = require('node-fetch');

const url = 'http://localhost:3000/api/v1';
// Get Orders
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

  it('Expected 404 for food id not found', () => {
    fetch(`${url}/orders/10`).then(data => data.json()).then((json) => {
      assert.equal(json.status, 'Food Not found');
    });
  });
});
// post orders
describe('POST Orders', () => {
  it('Success in posting orders', () => {
    const orders = {
      id: 35,
      food: 'Beans Rice',
      price: 9700,
      status: 'pending',
    };
    fetch(`${url}/orders`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-Type': 'application/json',
      },
      body: orders,
    }).then(data => data.json()).then((json) => {
      assert.equal(json, 'Object');
    });
  });
});
