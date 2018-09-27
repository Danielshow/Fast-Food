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
var FoodListController = function () {
  function FoodListController() {
    _classCallCheck(this, FoodListController);
  }

  _createClass(FoodListController, [{
    key: 'getAllFoods',
    value: function getAllFoods(req, res) {
      var food = _read_file2.default.readFromFile().foodList;
      return res.status(200).send(food);
    }
  }, {
    key: 'getFood',
    value: function getFood(req, res) {
      var id = req.params.id;

      var food = _read_file2.default.readFromFile().foodList;
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
    key: 'postFood',
    value: function postFood(req, res) {
      var imagePath = req.protocol + '://' + req.headers.host + '/' + req.file.path;
      var verify = _shared2.default.verifyBody(req, res);
      if (!verify) {
        return;
      }
      var food = _read_file2.default.readFromFile();
      // Generate Unique ID
      var id = _shared2.default.generateID(food.foodList);
      var newFoodlist = {
        id: id,
        food: req.body.food,
        price: req.body.price,
        imagePath: imagePath
      };
      food.foodList.push(newFoodlist);
      _fs2.default.writeFile('data.json', JSON.stringify(food, null, 2), function (err) {
        if (err) {
          return res.status(500).send({
            error: 'Error making request'
          });
        }
        return res.send({
          request: newFoodlist,
          message: 'Food Added Successfully'
        });
      });
    }
  }, {
    key: 'updateFood',
    value: function updateFood(req, res) {
      var reqData = req.body;
      var verify = _shared2.default.verifyBody();
      if (!(verify === true)) {
        return;
      }
      var id = req.params.id;

      var food = _read_file2.default.readFromFile();

      var _loop = function _loop(i) {
        if (food.foodList[i].id === Number(id)) {
          var newfood = food.foodList[i];
          newfood.food = reqData.food;
          newfood.price = reqData.price;
          _fs2.default.writeFile('data.json', JSON.stringify(food, null, 2), function (err) {
            if (err) {
              return res.send({
                error: 'Error updating food'
              });
            }
            return res.status(200).send({
              request: food.foodList[i],
              success: 'Food Updated'
            });
          });
        }
      };

      for (var i = 0; i < food.foodList.length; i += 1) {
        _loop(i);
      }
    }
  }, {
    key: 'deleteFood',
    value: function deleteFood(req, res) {
      var id = req.params.id;

      var food = _read_file2.default.readFromFile();
      food.foodList = food.foodList.filter(function (x) {
        return x.id !== Number(id);
      });
      _fs2.default.writeFile('data.json', JSON.stringify(food, null, 2), function (err) {
        if (err) {
          return res.status(500).send({
            error: 'error deleting food'
          });
        }
        return res.status(200).send({
          success: 'Food deleted'
        });
      });
    }
  }, {
    key: 'getTotal',
    value: function getTotal(req, res) {
      var newData = _read_file2.default.readFromFile();
      var total = 0;
      for (var i = 0; i < newData.userOrder.length; i += 1) {
        total += newData.userOrder[i].price;
      }
      return res.status(200).send({
        total: total,
        status: 'Success'
      });
    }
  }]);

  return FoodListController;
}();

var foodlistController = new FoodListController();
exports.default = foodlistController;