'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _orders = require('../controllers/orders');

var _orders2 = _interopRequireDefault(_orders);

var _shared = require('../js/shared');

var _shared2 = _interopRequireDefault(_shared);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// initialize router
var router = (0, _express.Router)();

// get user orders for admin page
router.get('/orders', _orders2.default.getAllOrder);
// get one order by ID
router.get('/orders/:id', _orders2.default.getOrder);
// get orders by a specific logged in user by their user_id
router.get('/users/:id', _orders2.default.getUserOrder);
// post new orders to the admin page by users
router.post('/orders', [_shared2.default.verifyBodyandQuantity, _shared2.default.verifyLenghtOfVariables], _orders2.default.postOrder);
// Edit order Status declined, completed, pending by admin
router.put('/orders/:id', _orders2.default.updateOrderStatus);

exports.default = router;