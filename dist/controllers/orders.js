'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _read_file = require('../js/read_file');

var _read_file2 = _interopRequireDefault(_read_file);

var _shared = require('../js/shared');

var _shared2 = _interopRequireDefault(_shared);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable class-methods-use-this */
var OrderController = function () {
  function OrderController() {
    _classCallCheck(this, OrderController);
  }

  _createClass(OrderController, [{
    key: 'getAllOrders',
    value: function getAllOrders(req, res) {
      var food = _read_file2.default.readFromFile();
      return res.status(200).send(food.userOrder);
    }
  }, {
    key: 'getOrder',
    value: function getOrder(req, res) {
      var id = req.params.id;

      var food = _read_file2.default.readFromFile().userOrder;
      for (var i = 0; i < food.length; i += 1) {
        if (food[i].id === Number(id)) {
          return res.status(200).send(food[i]);
        }
      }
      return res.status(404).send({
        status: 'Food Not found'
      });
    }
  }, {
    key: 'getUserOrder',
    value: function getUserOrder(req, res) {
      var id = req.params.id;

      var food = _read_file2.default.readFromFile().userOrder;
      food = food.filter(function (x) {
        return x.user_id === Number(id);
      });
      if (food.length > 0) {
        res.status(200).send(food);
      } else {
        res.status(404).send({
          status: 'error',
          message: 'Not Found'
        });
      }
    }
  }, {
    key: 'postOrder',
    value: function postOrder(req, res) {
      var newFood = req.body;
      _shared2.default.verifyBody(req, res);
      // split the food and price if they are more than one
      var foodAdded = newFood.food.split(',');
      var quantity = newFood.quantity.split(',');
      var price = newFood.price.split(',');
      // check if food and quantity are of same length
      var verify = _shared2.default.verifyLenghtOfVariables(foodAdded, quantity, price, res);
      if (!(verify === true)) {
        return;
      }
      // multiply quantity by their price to get total price
      var addedPrice = 0;
      for (var i = 0; i < quantity.length; i += 1) {
        addedPrice += Number(price[i]) * Number(quantity[i]);
      }
      price = addedPrice;
      // generate random number
      var userId = _shared2.default.generateRandomNumber();
      var food = _read_file2.default.readFromFile();
      var id = _shared2.default.generateID(food.userOrder);
      var updatedFood = {
        id: id,
        food: foodAdded,
        quantity: quantity,
        price: price,
        status: 'Pending',
        user_id: userId
      };
      food.userOrder.push(updatedFood);
      _fs2.default.writeFile('data.json', JSON.stringify(food, null, 2), function (err) {
        if (err) {
          return res.status(500).send({
            error: 'Error adding food'
          });
        }
        return res.status(200).send({
          request: updatedFood,
          success: 'Food Added to order list Successfully'
        });
      });
    }
  }, {
    key: 'updateOrderStatus',
    value: function updateOrderStatus(req, res) {
      // status must be passed with the body
      var status = req.body.status;

      if (Object.keys(req.body).length === 0) {
        return res.status(204).send({
          status: 'No content'
        });
      }

      var id = req.params.id;

      var food = _read_file2.default.readFromFile();

      var _loop = function _loop(i) {
        if (food.userOrder[i].id === Number(id)) {
          food.userOrder[i].status = status;
          _fs2.default.writeFile('data.json', JSON.stringify(food, null, 2), function (err) {
            if (err) {
              return res.status(500).send({
                error: 'Error updating food'
              });
            }
            return res.status(200).send({
              request: food.userOrder[i],
              success: 'Status Updated'
            });
          });
        }
      };

      for (var i = 0; i < food.userOrder.length; i += 1) {
        _loop(i);
      }
      return res.send({
        message: 'Food not found'
      });
    }
  }]);

  return OrderController;
}();

var orderController = new OrderController();
exports.default = orderController;