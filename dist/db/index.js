'use strict';

var _pg = require('pg');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

// const pool = new Pool();
// // create table
// // node-postgres.com
// module.exports = {
//   query: ((text, params, callback) => {
//     pool.query(text, params, callback);
//   }),
// };

var pool = new _pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.SSL_CONNECT
});

module.exports = {
  query: function query(text, params, callback) {
    pool.query(text, params, callback);
  }
};