'use strict';

// import { assert } from 'chai';
// import fetch from 'node-fetch';
var assert = require('chai').assert;
var fetch = require('node-fetch');

var url = 'http://localhost:3000/api/v1';
// Get Orders
describe('Get orders', function () {
  it('Expected Array', function () {
    fetch(url + '/orders').then(function (data) {
      return data.json();
    }).then(function (json) {
      assert.typeOf(json, 'Array');
    });
  });

  it('Expected One array (Length 1)', function () {
    fetch(url + '/orders/7').then(function (data) {
      return data.json();
    }).then(function (json) {
      assert.typeOf(json, 'Object');
    });
  });

  it('Expected 404 for food id not found', function () {
    fetch(url + '/orders/10').then(function (data) {
      return data.json();
    }).then(function (json) {
      assert.equal(json.status, 'Food Not found');
    });
  });
});
// post orders
describe('POST Orders', function () {
  it('Success in posting orders', function () {
    var orders = {
      id: 35,
      food: 'Beans Rice',
      price: 9700,
      status: 'pending'
    };
    fetch(url + '/orders', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain',
        'content-type': 'application/json'
      },
      body: orders
    }).then(function (data) {
      return data.json();
    }).then(function (json) {
      assert.equal(json, 'Object');
    });
  });
});