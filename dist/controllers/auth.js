'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _index = require('../db/index');

var _index2 = _interopRequireDefault(_index);

var _shared = require('../js/shared');

var _shared2 = _interopRequireDefault(_shared);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable class-methods-use-this */
var AuthController = function () {
  function AuthController() {
    _classCallCheck(this, AuthController);
  }

  _createClass(AuthController, [{
    key: 'register',
    value: function register(req, res) {
      // email, password, address, name
      var isValid = _shared2.default.validate(req.body.email);
      if (!isValid) {
        return res.status(400).json({
          message: 'Email format is wrong'
        });
      }
      var password = _bcryptjs2.default.hashSync('req.body.password', 10);
      var params = [req.body.name, req.body.email, password, req.body.address];
      _index2.default.query('INSERT INTO users(name, email, password, address) VALUES($1,$2,$3,$4)', params, function (err) {
        if (err) {
          console.log(err);
        }
        return res.status(200).json({
          request: {
            name: req.body.name,
            email: req.body.email,
            address: req.body.address
          },
          message: 'Registered Successfully'
        });
      });
    }
  }]);

  return AuthController;
}();

var authcontroller = new AuthController();
exports.default = authcontroller;