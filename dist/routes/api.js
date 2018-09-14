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

router.get('/', function (req, res) {
  res.status(200).send({
    product: 'Food Fast API',
    routes: '/ before every route'
  });
});
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
  if (Object.keys(newFood).length === 0) {
    return res.status(204).send({
      status: 'No content'
    });
  }
  if (!(newFood.price && newFood.food && newFood.quantity)) {
    return res.send({
      status: 'Incomplete content',
      message: 'Body must contain Price, Food and Quantity'
    });
  }
  // split the food and price if they are more than one
  var foodAdded = newFood.food.split(',');
  var quantity = newFood.quantity.split(',');
  var price = newFood.price.split(',');
  if (foodAdded.length > quantity.length) {
    return res.send({
      status: 'Incomplete content',
      message: '1 or more quantity(s) is missing'
    });
  }if (quantity.length > foodAdded.length) {
    return res.send({
      status: 'Incomplete content',
      message: '1 or more food is missing'
    });
  }if (quantity.length !== price.length) {
    return res.send({
      status: 'Incomplete content',
      message: 'price for each food must be added'
    });
  }
  // add all the quantity price together
  var addedPrice = 0;
  for (var i = 0; i < quantity.length; i += 1) {
    addedPrice += Number(price[i]) * Number(quantity[i]);
  }
  price = addedPrice;
  var data = _fs2.default.readFileSync('data.json');
  var food = JSON.parse(data);
  var id = 0;
  if (food.userOrder[food.userOrder.length - 1].id === undefined) {
    id = 1;
  } else {
    id = food.userOrder[food.userOrder.length - 1].id + 1;
  }
  var updatedFood = {
    id: id,
    food: foodAdded,
    quantity: quantity,
    price: price,
    status: 'Pending'
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
});
// Edit order Status declined, completed, pending by admin
router.put('/orders/:id', function (req, res) {
  // status must be passed with the body
  var parameter = req.body;
  if (Object.keys(parameter).length === 0) {
    return res.status(204).send({
      status: 'No content'
    });
  }

  var id = req.params.id;

  var data = _fs2.default.readFileSync('data.json');
  var food = JSON.parse(data);

  var _loop = function _loop(i) {
    if (food.userOrder[i].id === Number(id)) {
      food.userOrder[i].status = parameter.status;
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
});

exports.default = router;