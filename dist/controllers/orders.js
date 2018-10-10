'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../db/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable class-methods-use-this */
var OrderController = function () {
  function OrderController() {
    _classCallCheck(this, OrderController);
  }

  _createClass(OrderController, [{
    key: 'getAllOrder',
    value: function getAllOrder(req, res, next) {
      _index2.default.query('SELECT * FROM orders', function (err, data) {
        if (err) {
          return next(err);
        }
        return res.status(200).json({
          TYPE: 'GET',
          status: 200,
          data: data.rows,
          message: 'Orders returned successfully'
        });
      });
    }
  }, {
    key: 'getOrder',
    value: function getOrder(req, res, next) {
      var id = req.params.id;

      _index2.default.query('SELECT * FROM orders WHERE id=$1', [id], function (err, data) {
        if (err) {
          return next(err);
        }
        if (data.rows.length > 0) {
          return res.status(200).json({
            TYPE: 'GET',
            status: 200,
            data: data.rows[0],
            message: 'Order returned Successfully'
          });
        }
        return res.status(404).json({
          TYPE: 'GET',
          status: 404,
          message: 'Food not found'
        });
      });
    }
  }, {
    key: 'getUserOrder',
    value: function getUserOrder(req, res, next) {
      var id = req.params.id;

      _index2.default.query('SELECT * FROM orders WHERE user_id=$1', [id], function (err, data) {
        if (err) {
          return next(err);
        }
        if (data.rows.length > 0) {
          return res.status(200).json({
            TYPE: 'GET',
            status: 200,
            data: data.rows,
            message: 'food returned Successfully'
          });
        }
        return res.status(404).json({
          TYPE: 'GET',
          status: 404,
          message: 'Food by user not found'
        });
      });
    }
  }, {
    key: 'postOrder',
    value: function postOrder(req, res, next) {
      var quantity = req.body.quantity.split(',');
      var food = req.body.food.split(',');
      var price = req.body.price.split(',');
      var userId = req.decoded.userid;
      var addedPrice = 0;
      for (var i = 0; i < quantity.length; i += 1) {
        addedPrice += Number(price[i].trim()) * Number(quantity[i].trim());
      }
      price = addedPrice;
      var quantityList = [];
      var foodlist = [];
      for (var j = 0; j < food.length; j += 1) {
        quantityList.push(quantity[j].trim());
        foodlist.push(food[j].trim());
      }
      _index2.default.query('INSERT INTO orders(food,quantity,price,user_id,status) VALUES($1,$2,$3,$4,$5)', [foodlist.join(','), quantityList.join(','), price, userId, 'new'], function (err) {
        if (err) {
          return next(err);
        }
        return res.status(200).json({
          TYPE: 'POST',
          status: 200,
          data: {
            food: food,
            quantity: quantity,
            price: price,
            status: 'new',
            userId: userId
          },
          message: 'Food Added to order list Successfully'
        });
      });
    }
  }, {
    key: 'updateOrderStatus',
    value: function updateOrderStatus(req, res, next) {
      if (!req.body.status || req.body.status.trim().length < 1) {
        res.status(206).json({
          TYPE: 'PUT',
          status: 206,
          message: 'Status Not sent'
        });
      }
      var status = req.body.status;
      var id = req.params.id;

      _index2.default.query('UPDATE orders SET status=$1 WHERE id=$2', [status.toLowerCase(), id], function (err) {
        if (err) {
          return res.status(400).send({
            TYPE: 'PUT',
            status: 400,
            message: 'status should be either New,Processing,Cancelled or Complete.'
          });
        }
        return res.status(200).json({
          TYPE: 'PUT',
          status: 200,
          message: 'Food Status Updated'
        });
      });
    }
  }]);

  return OrderController;
}();

var orderController = new OrderController();
exports.default = orderController;