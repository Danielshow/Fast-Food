'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var readFromFile = function readFromFile() {
  var data = _fs2.default.readFileSync('data.json');
  var food = JSON.parse(data);
  return food;
};
// check if food is available, return true
var isFoodAvailable = function isFoodAvailable(food) {
  var foods = readFromFile().foodList;
  for (var i = 0; i < foods.length; i += 1) {
    if (food.toLowerCase() === foods[i].food.toLowerCase()) {
      return true;
    }
  }
  return false;
};
exports.default = {
  readFromFile: readFromFile,
  isFoodAvailable: isFoodAvailable
};