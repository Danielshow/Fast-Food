import db from './index';
db.query(`CREATE TYPE status AS ENUM ('new', 'processing', 'cancelled', 'complete')`, (err => {
  if (err) {
    console.log(err);
  }
}));

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
