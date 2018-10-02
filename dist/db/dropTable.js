'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_index2.default.query('DROP TABLE IF EXISTS orders', function (err) {
  if (err) {
    console.log(err);
  }
});

_index2.default.query('DROP TABLE IF EXISTS foodlist', function (err) {
  if (err) {
    console.log(err);
  }
});

_index2.default.query('DROP TYPE IF EXISTS status', function (err) {
  if (err) {
    console.log(err);
  }
  _index2.default.query('CREATE TYPE status AS ENUM (\'new\', \'processing\', \'cancelled\', \'complete\')', function (err) {
    if (err) {
      console.log(err);
    }
  });
});