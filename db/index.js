const { Pool } = require('pg');

const pool = new Pool();
pool.connect()
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.log(err.message);
  });

// create table
// node-postgres.com
module.exports = {
  query: ((text, params, callback) => {
    pool.query(text, params, callback);
  }),
};
