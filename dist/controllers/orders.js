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
    key: 'getAllOrder',
    value: function getAllOrder(req, res) {
      var food = _read_file2.default.readFromFile();
      return res.status(200).json({
        orders: food.userOrder,
        message: 'Orders returned Successfully'
      });
    }
  }, {
    key: 'getOrder',
    value: function getOrder(req, res) {
      var id = req.params.id;

      var food = _read_file2.default.readFromFile().userOrder;
      for (var i = 0; i < food.length; i += 1) {
        if (food[i].id === Number(id)) {
          return res.status(200).json({
            order: food[i],
            message: 'Order returned successfully'
          });
        }
      }
      return res.status(404).json({
        message: 'Food Not found'
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
        res.status(200).json({
          food: food,
          userId: id,
          message: 'specific user order returned successfully'
        });
      } else {
        res.status(404).json({
          message: 'Not Found'
        });
      }
    }
  }, {
    key: 'postOrder',
    value: function postOrder(req, res) {
      var newFood = req.body;
      var checkbody = _shared2.default.verifyBodyandQuantity(req, res);
      if (checkbody !== true) {
        return;
      }
      // split the food and price if they are more than one
      var foodAdded = newFood.food.split(',');
      var quantity = newFood.quantity.split(',');
      var price = newFood.price.split(',');
      // check if food and quantity are of same length
      var verify = _shared2.default.verifyLenghtOfVariables(foodAdded, quantity, price, res);
      if (verify !== true) {
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
          return res.status(500).json({
            message: 'Error adding food'
          });
        }
        return res.status(200).json({
          request: updatedFood,
          message: 'Food Added to order list Successfully'
        });
      });
    }
  }, {
    key: 'updateOrderStatus',
    value: function updateOrderStatus(req, res) {
      // status must be passed with the body
      if (!req.body.status) {
        res.json({
          message: 'Status Not sent'
        });
      }
      var status = req.body.status;
      var id = req.params.id;

      var food = _read_file2.default.readFromFile();

      var _loop = function _loop(i) {
        if (food.userOrder[i].id === Number(id)) {
          food.userOrder[i].status = status;
          _fs2.default.writeFile('data.json', JSON.stringify(food, null, 2), function (err) {
            if (err) {
              return res.json({
                message: 'Error updating food'
              });
            }
            return res.json({
              request: food.userOrder[i],
              message: 'Status Updated'
            });
          });
        }
      };

      for (var i = 0; i < food.userOrder.length; i += 1) {
        _loop(i);
      }
    }
  }]);

  return OrderController;
}();

var orderController = new OrderController();
exports.default = orderController;