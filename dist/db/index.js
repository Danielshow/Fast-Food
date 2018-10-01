'use strict';

var _require = require('pg'),
    Pool = _require.Pool;

var pool = new Pool();
// create table
// node-postgres.com
module.exports = {
  query: function query(text, params, callback) {
    pool.query(text, params, callback);
  }
};