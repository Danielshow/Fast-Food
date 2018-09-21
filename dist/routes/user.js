'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _read_file = require('./read_file');

var _read_file2 = _interopRequireDefault(_read_file);

var _shared = require('../js/shared');

var _shared2 = _interopRequireDefault(_shared);

var _multer_config = require('../js/multer_config');

var _multer_config2 = _interopRequireDefault(_multer_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// initialize router
var router = (0, _express.Router)();

// get food list available on the webpage
router.get('/foodlist', function (req, res) {
  var food = _read_file2.default.readFromFile().foodList;
  return res.status(200).send(food);
});
// get foodlist by ID
router.get('/foodlist/:id', function (req, res) {
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
});
// post new food to foodlist by admin
router.post('/foodlist', _multer_config2.default.single('foodImage'), function (req, res) {
  var imagePath = req.protocol + '://' + req.headers.host + '/' + req.file.path;
  var verify = _shared2.default.verifyBody(req, res);
  if (!(verify === true)) {
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
    return res.status(200).send({
      request: newFoodlist,
      message: 'Food Added Successfully'
    });
  });
});
// Admin can update food from foodList
router.put('/foodlist/:id', function (req, res) {
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
});
// Delete food from foodList
router.delete('/foodlist/:id', function (req, res) {
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
});
// get the price of all food ordered by users
router.get('/totalprice', function (req, res) {
  var newData = _read_file2.default.readFromFile();
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