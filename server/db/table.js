import db from './index';

db.query(`CREATE TABLE users(
id serial PRIMARY KEY,
name text NOT NULL,
email text NOT NULL,
password text NOT NULL,
address text NOT NULL,
roles roles NOT NULL
)`, (err) => {
  if (err) {
    console.log(err);
  }
  db.query(`create table orders(
  id serial PRIMARY KEY,
  food text NOT NULL,
  quantity text NOT NULL,
  price numeric NOT NULL,
  user_id integer References users(id) on DELETE CASCADE,
  status status NOT NULL,
  address text NOT NULL,
  phonenumber text NOT NULL
  )`, (err) => {
    if (err) {
      console.log(err);
    }
  });
});

db.query(`CREATE TABLE foodlist(
id serial PRIMARY KEY,
food text NOT NULL,
price numeric NOT NULL,
image text NOT NULL
)`, (err) => {
  if (err) {
    console.log(err);
  }
});
