'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var listVerify = function listVerify(req, res, next) {
  var price = req.body.price.split(',');
  var food = req.body.food.split(',');
  var quantity = req.body.quantity.split(',');

  for (var i = 0; i < price.length; i += 1) {
    if (isNaN(price[i].trim()) || isNaN(quantity[i].trim())) {
      return res.status(400).json({
        message: 'Bad request, Price and quantity must be a Number'
      });
    }
    if (food[i].trim() === '') {
      return res.status(400).json({
        message: 'Bad Request, Food at position ' + (i + 1) + ' cannot be empty'
      });
    }
  }
  return next();
};

exports.default = listVerify;