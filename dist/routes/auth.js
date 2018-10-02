'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _auth = require('../controllers/auth');

var _auth2 = _interopRequireDefault(_auth);

var _authmiddleware = require('../js/authmiddleware');

var _authmiddleware2 = _interopRequireDefault(_authmiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// initialize router
var router = (0, _express.Router)();

router.post('/auth/signup', [_authmiddleware2.default.verifyBody, _authmiddleware2.default.validate, _authmiddleware2.default.isEmailExist], _auth2.default.register);
router.post('/auth/login', [_authmiddleware2.default.verifySignin, _authmiddleware2.default.isEmailInDb], _auth2.default.login);

exports.default = router;