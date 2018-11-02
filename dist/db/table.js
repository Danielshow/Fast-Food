'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_index2.default.query('CREATE TABLE users(\nid serial PRIMARY KEY,\nname text NOT NULL,\nemail text NOT NULL,\npassword text NOT NULL,\naddress text NOT NULL,\nroles roles NOT NULL\n)', function (err) {
  if (err) {
    console.log(err);
  }
  _index2.default.query('create table orders(\n  id serial PRIMARY KEY,\n  food text NOT NULL,\n  quantity text NOT NULL,\n  price numeric NOT NULL,\n  user_id integer References users(id) on DELETE CASCADE,\n  status status NOT NULL,\n  address text NOT NULL,\n  phonenumber text NOT NULL\n  )', function (err) {
    if (err) {
      console.log(err);
    }
  });
});

_index2.default.query('CREATE TABLE foodlist(\nid serial PRIMARY KEY,\nfood text NOT NULL,\nprice numeric NOT NULL,\nimage text NOT NULL\n)', function (err) {
  if (err) {
    console.log(err);
  }
});