'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _auth = require('../controllers/auth');

var _auth2 = _interopRequireDefault(_auth);

var _auth3 = require('../middleware/auth');

var _auth4 = _interopRequireDefault(_auth3);

var _checkAuth = require('../middleware/checkAuth');

var _checkAuth2 = _interopRequireDefault(_checkAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// initialize router
var router = (0, _express.Router)();

router.post('/auth/signup', [_auth4.default.verifyBody, _auth4.default.confirmPassword, _auth4.default.validate, _auth4.default.isEmailExist], _auth2.default.register);
router.post('/auth/login', [_auth4.default.verifySignin, _auth4.default.isEmailInDb], _auth2.default.login);
router.post('/auth/signup/admin', _checkAuth2.default.verifyAdminToken, [_auth4.default.verifyBody, _auth4.default.confirmPassword, _auth4.default.validate, _auth4.default.isEmailExist], _auth2.default.adminRegister);

exports.default = router;