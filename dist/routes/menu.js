'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _multer_config = require('../js/multer_config');

var _multer_config2 = _interopRequireDefault(_multer_config);

var _menu = require('../controllers/menu');

var _menu2 = _interopRequireDefault(_menu);

var _shared = require('../js/shared');

var _shared2 = _interopRequireDefault(_shared);

var _read_file = require('../js/read_file');

var _read_file2 = _interopRequireDefault(_read_file);

var _checkAuth = require('../js/checkAuth');

var _checkAuth2 = _interopRequireDefault(_checkAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// initialize router
var router = (0, _express.Router)();

// get food list available on the webpage
router.get('/menu', _checkAuth2.default.verifyToken, _menu2.default.getAllFood);
// get foodlist by ID
router.get('/menu/:id', _checkAuth2.default.verifyToken, _menu2.default.getFood);
// post new food to foodlist by admin
router.post('/menu', _checkAuth2.default.verifyAdminToken, [ _multer_config2.default.single('foodImage'), _shared2.default.verifyBody, _read_file2.default.isFoodAvailable], _menu2.default.postFood);
// Admin can update food from foodList
router.put('/menu/:id', _checkAuth2.default.verifyAdminToken, _multer_config2.default.single('foodImage'), [_shared2.default.verifyBody], _menu2.default.updateFood);
// Delete food from foodList
router.delete('/menu/:id', _checkAuth2.default.verifyAdminToken, _menu2.default.deleteFood);
// get the price of all food ordered by users
router.get('/total', _checkAuth2.default.verifyAdminToken, _menu2.default.getTotal);
exports.default = router;
