'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _orders = require('../controllers/orders');

var _orders2 = _interopRequireDefault(_orders);

var _shared = require('../middleware/shared');

var _shared2 = _interopRequireDefault(_shared);

var _checkAuth = require('../middleware/checkAuth');

var _checkAuth2 = _interopRequireDefault(_checkAuth);

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

var _list_verify = require('../middleware/list_verify');

var _list_verify2 = _interopRequireDefault(_list_verify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// initialize router
var router = (0, _express.Router)();

// get user orders for admin page
router.get('/orders', _checkAuth2.default.verifyAdminToken, _orders2.default.getAllOrder);
// get one order by ID
router.get('/orders/:id', _checkAuth2.default.verifyAdminToken, [_auth2.default.isValidID], _orders2.default.getOrder);
// get orders by a specific logged in user by their user_id
router.get('/users/:id/orders', [_auth2.default.isValidID], _checkAuth2.default.isUserResource, _orders2.default.getUserOrder);
// post new orders to the admin page by users
router.post('/orders', _checkAuth2.default.verifyToken, [_shared2.default.verifyBodyandQuantity, _shared2.default.verifyLenghtOfVariables, _list_verify2.default], _orders2.default.postOrder);
// Edit order Status declined, completed, pending by admin
router.put('/orders/:id', _checkAuth2.default.verifyAdminToken, [_auth2.default.isValidID], _orders2.default.updateOrderStatus);

exports.default = router;