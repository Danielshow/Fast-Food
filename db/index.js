import { Pool } from 'pg';
import env from 'dotenv';

env.config();

const pool = new Pool();
// create table
// node-postgres.com
module.exports = {
  query: ((text, params, callback) => {
    pool.query(text, params, callback);
  }),
};
