'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _orders = require('../controllers/orders');

var _orders2 = _interopRequireDefault(_orders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// initialize router
var router = (0, _express.Router)();

router.get('/', function (req, res, next) {
  res.status(200).send({
    product: 'Food Fast API',
    routes: '/ before every route'
  });
});
// get user orders for admin page
router.get('/orders', _orders2.default.getAllOrders);
// get one order by ID
router.get('/orders/:id', _orders2.default.getOrder);
// get orders by a specific logged in user by their user_id
router.get('/userorder/:id', _orders2.default.getUserOrder);
// post new orders to the admin page by users
router.post('/orders', _orders2.default.postOrder);
// Edit order Status declined, completed, pending by admin
router.put('/orders/:id', _orders2.default.updateOrderStatus);

exports.default = router;