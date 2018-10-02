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
