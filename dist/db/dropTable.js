'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_index2.default.query('DROP TABLE IF EXISTS orders CASCADE', function (err) {
  if (err) {
    console.log(err);
  }
});

_index2.default.query('DROP TABLE IF EXISTS foodlist CASCADE', function (err) {
  if (err) {
    console.log(err);
  }
});

_index2.default.query('DROP TABLE IF EXISTS users CASCADE', function (err) {
  if (err) {
    console.log(err);
  }
});

_index2.default.query('DROP TYPE IF EXISTS status CASCADE', function (err) {
  if (err) {
    console.log(err);
  }
  _index2.default.query('CREATE TYPE status AS ENUM (\'new\', \'processing\', \'cancelled\', \'complete\')', function (error) {
    if (err) {
      console.log(error);
    }
  });
});

_index2.default.query('DROP TYPE IF EXISTS roles CASCADE', function (err) {
  if (err) {
    console.log(err);
  }
  _index2.default.query('CREATE TYPE roles AS ENUM (\'user\', \'admin\')', function (error) {
    if (err) {
      console.log(error);
    }
  });
});