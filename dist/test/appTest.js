'use strict';

// import { assert } from 'chai';
// import fetch from 'node-fetch';
var assert = require('chai').assert;
var fetch = require('node-fetch');
var url = 'http://localhost:3000/api/v1';

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
});