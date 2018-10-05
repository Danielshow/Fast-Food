'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _shared = require('../middleware/shared');

var _shared2 = _interopRequireDefault(_shared);

var _index = require('../db/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable class-methods-use-this */
var FoodListController = function () {
  function FoodListController() {
    _classCallCheck(this, FoodListController);
  }

  _createClass(FoodListController, [{
    key: 'getAllFood',
    value: function getAllFood(req, res, next) {
      _index2.default.query('SELECT * FROM foodlist', function (err, data) {
        if (err) {
          return next(err);
        }
        return res.status(200).json({
          food: data.rows,
          message: 'Food Returned Successfully'
        });
      });
    }
  }, {
    key: 'getFood',
    value: function getFood(req, res, next) {
      var id = req.params.id;

      _index2.default.query('SELECT * FROM foodlist WHERE id=$1', [id], function (err, data) {
        if (err) {
          return next(err);
        }
        if (data.rows.length > 0) {
          return res.status(200).json({
            food: data.rows[0],
            message: 'Food returned Successfully'
          });
        }
        return res.status(404).json({
          message: 'Food not found'
        });
      });
    }
  }, {
    key: 'postFood',
    value: function postFood(req, res, next) {
      var imagePath = _shared2.default.imagePicker(req);
      _index2.default.query('INSERT INTO foodlist(food, price, image) VALUES($1,$2,$3)', [req.body.food, req.body.price, imagePath], function (err) {
        if (err) {
          return next(err);
        }
        return res.status(200).json({
          request: {
            food: req.body.food.trim(),
            price: Number(req.body.price),
            image: imagePath
          },
          message: 'Food Added Successfully'
        });
      });
    }
  }, {
    key: 'updateFood',
    value: function updateFood(req, res, next) {
      var id = req.params.id;

      var imagePath = _shared2.default.imagePicker(req);
      _index2.default.query('UPDATE foodlist SET food=$1,price=$2,image=$3 WHERE id=$4', [req.body.food, req.body.price, imagePath, id], function (err) {
        if (err) {
          return next(err);
        }
        return res.status(200).json({
          request: {
            food: req.body.food.trim(),
            price: Number(req.body.price),
            image: imagePath
          },
          message: 'Food Updated'
        });
      });
    }
  }, {
    key: 'deleteFood',
    value: function deleteFood(req, res, next) {
      var id = req.params.id;

      _index2.default.query('DELETE from foodlist WHERE id=$1', [id], function (err) {
        if (err) {
          return next(err);
        }
        return res.status(200).json({
          message: 'Food deleted'
        });
      });
    }
  }, {
    key: 'getTotal',
    value: function getTotal(req, res, next) {
      _index2.default.query('SELECT sum(price) from ORDERS', function (err, data) {
        if (err) {
          return next(err);
        }
        return res.status(200).json({
          total: data.rows[0].sum,
          message: 'Success, Total Returned'
        });
      });
    }
  }]);

  return FoodListController;
}();

var foodlistController = new FoodListController();
exports.default = foodlistController;