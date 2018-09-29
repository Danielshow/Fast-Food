'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _multer_config = require('../js/multer_config');

var _multer_config2 = _interopRequireDefault(_multer_config);

var _foodlist = require('../controllers/foodlist');

var _foodlist2 = _interopRequireDefault(_foodlist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// initialize router
var router = (0, _express.Router)();

// get food list available on the webpage
router.get('/foodlist', _foodlist2.default.getAllFood);
// get foodlist by ID
router.get('/foodlist/:id', _foodlist2.default.getFood);
// post new food to foodlist by admin
router.post('/foodlist', _multer_config2.default.single('foodImage'), _foodlist2.default.postFood);
// Admin can update food from foodList
router.put('/foodlist/:id', _foodlist2.default.updateFood);
// Delete food from foodList
router.delete('/foodlist/:id', _foodlist2.default.deleteFood);
// get the price of all food ordered by users
router.get('/total', _foodlist2.default.getTotal);
exports.default = router;