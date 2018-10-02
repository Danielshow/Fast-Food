import db from './index';

db.query(`create table orders(
id serial PRIMARY KEY,
food text NOT NULL,
quantity text NOT NULL,
price numeric NOT NULL,
user_id integer NOT NULL,
status status NOT NULL
)`, (err) => {
  if (err) {
    console.log(err);
  }
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

db.query(`CREATE TABLE users(
id serial PRIMARY KEY,
name text NOT NULL,
email text NOT NULL,
password text NOT NULL,
address text NOT NULL
)`, (err) => {
  if (err) {
    console.log(err);
  }
});
