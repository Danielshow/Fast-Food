import { Pool } from 'pg';
import env from 'dotenv';

env.config();

// const pool = new Pool();
// // create table
// // node-postgres.com
// module.exports = {
//   query: ((text, params, callback) => {
//     pool.query(text, params, callback);
//   }),
// };

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.SSL_CONNECT,
});

module.exports = {
  query: ((text, params, callback) => {
    pool.query(text, params, callback);
  }),
};
