'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function readFromFile() {
  var data = _fs2.default.readFileSync('data.json');
  var food = JSON.parse(data);
  return food;
}

exports.default = {
  readFromFile: readFromFile
};