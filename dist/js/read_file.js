'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../db/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// check if food is available, return true
var isFoodAvailable = function isFoodAvailable(req, res, next) {
  _index2.default.query('SELECT food from foodlist', function (err, data) {
    if (err) {
      return res.json({
        message: err.message
      });
    }
    for (var i = 0; i < data.rows.length; i += 1) {
      if (req.body.food.toLowerCase() === data.rows[i].food.toLowerCase()) {
        return res.status(409).json({
          message: 'Food Already in FoodList'
        });
      }
    }
    next();
  });
};
exports.default = {
  isFoodAvailable: isFoodAvailable
};