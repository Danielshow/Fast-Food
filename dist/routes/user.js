'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// initialize router
var router = (0, _express.Router)();

// get food list available on the webpage
router.get('/foodlist', function (req, res) {
  var data = _fs2.default.readFileSync('data.json');
  var food = JSON.parse(data);
  return res.status(200).send(food.foodList);
});
// get foodlist by ID
router.get('/foodlist/:id', function (req, res) {
  var id = req.params.id;

  var data = _fs2.default.readFileSync('data.json');
  var food = JSON.parse(data).foodList;
  for (var i = 0; i < food.length; i += 1) {
    if (food[i].id === Number(id)) {
      return res.status(200).send(food[i]);
    }
  }
  return res.status(404).send({
    status: 'Food Not found'
  });
});
// post new food to foodlist by admin
router.post('/foodlist', function (req, res) {
  var orderFood = req.body;
  if (Object.keys(orderFood).length === 0) {
    return res.status(204).send({
      status: 'No content'
    });
  }
  var data = _fs2.default.readFileSync('data.json');
  var food = JSON.parse(data);
  food.foodList.push(orderFood);
  _fs2.default.writeFile('data.json', JSON.stringify(food, null, 2), function (err) {
    if (err) {
      return res.status(500).send({
        error: 'Error making request'
      });
    }
    return res.status(200).send({
      request: req.body,
      success: 'Food Added Successfully'
    });
  });
});
// Admin can update food from foodList
router.put('/foodlist/:id', function (req, res) {
  var reqData = req.body;
  if (Object.keys(reqData).length === 0) {
    return res.status(204).send({
      status: 'No content'
    });
  }
  var id = req.params.id;

  var data = _fs2.default.readFileSync('data.json');
  var food = JSON.parse(data);

  var _loop = function _loop(i) {
    if (food.foodList[i].id === Number(id)) {
      // food, price, status
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
});
// get the price of all food ordered by admin
router.get('/totalprice', function (req, res) {
  var data = _fs2.default.readFileSync('data.json');
  var newData = JSON.parse(data);
  var total = 0;
  for (var i = 0; i < newData.userOrder.length; i += 1) {
    total += newData.userOrder[i].price;
  }
  return res.status(200).send({
    total: total,
    status: 'Success'
  });
});
exports.default = router;