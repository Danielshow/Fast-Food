import db from './index';

db.query('DROP TABLE IF EXISTS orders', (err) => {
  if (err) {
    console.log(err);
  }
});

db.query('DROP TABLE IF EXISTS foodlist', (err) => {
  if (err) {
    console.log(err);
  }
});

db.query('DROP TABLE IF EXISTS users', (err) => {
  if (err) {
    console.log(err);
  }
});

db.query('DROP TYPE IF EXISTS status', (err) => {
  if (err) {
    console.log(err);
  }
  db.query('CREATE TYPE status AS ENUM (\'new\', \'processing\', \'cancelled\', \'complete\')', ((err) => {
    if (err) {
      console.log(err);
    }
  }));
});
