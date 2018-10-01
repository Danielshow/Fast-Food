const { Pool } = require('pg');

const pool = new Pool();
// create table
// node-postgres.com
module.exports = {
  query: ((text, params, callback) => {
    pool.query(text, params, callback);
  }),
};
