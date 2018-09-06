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

// get user orders for admin page
router.get('/orders', function (req, res) {
  var data = _fs2.default.readFileSync('data.json');
  var food = JSON.parse(data);
  return res.status(200).send(food.userOrder);
});
// get one order by ID
router.get('/orders/:id', function (req, res) {
  var id = req.params.id;

  var data = _fs2.default.readFileSync('data.json');
  var food = JSON.parse(data).userOrder;
  for (var i = 0; i < food.length; i += 1) {
    if (food[i].id === Number(id)) {
      return res.status(200).send(food[i]);
    }
  }
  return res.status(404).send({
    status: 'Food Not found'
  });
});
// post new orders to the admin page by users
router.post('/orders', function (req, res) {
  var newFood = req.body;
  var data = _fs2.default.readFileSync('data.json');
  var food = JSON.parse(data);
  food.userOrder.push(newFood);
  _fs2.default.writeFile('data.json', JSON.stringify(food, null, 2), function (err) {
    if (err) {
      return res.send({
        error: 'Error adding food'
      });
    }
    return res.status(200).send({
      request: req.body,
      Success: 'Food Added'
    });
  });
});
// Edit order Status declined, completed, pending by admin
router.put('/orders/:id', function (req, res) {
  var parameter = req.body;
  var id = req.params.id;

  var data = _fs2.default.readFileSync('data.json');
  var food = JSON.parse(data);

  var _loop = function _loop(i) {
    if (food.userOrder[i].id === Number(id)) {
      food.userOrder[i].status = parameter.status;
      _fs2.default.writeFile('data.json', JSON.stringify(food, null, 2), function (err) {
        if (err) {
          res.send({
            error: 'Error updating food'
          });
        } else {
          res.send({
            request: food.userOrder[i],
            Sucess: 'Status Updated'
          });
        }
      });
    }
  };

  for (var i = 0; i < food.userOrder.length; i += 1) {
    _loop(i);
  }
});

exports.default = router;