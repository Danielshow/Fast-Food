'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _index = require('../db/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable class-methods-use-this */
var AuthController = function () {
  function AuthController() {
    _classCallCheck(this, AuthController);
  }

  _createClass(AuthController, [{
    key: 'register',
    value: function register(req, res, next) {
      var password = _bcryptjs2.default.hashSync(req.body.password, 10);
      var params = [req.body.name, req.body.email, password, req.body.address, 'user'];
      _index2.default.query('INSERT INTO users(name, email, password, address, roles) VALUES($1,$2,$3,$4,$5)', params, function (err) {
        if (err) {
          return next(err);
        }
        return res.status(200).json({
          request: {
            name: req.body.name.trim(),
            email: req.body.email.trim(),
            address: req.body.address.trim()
          },
          message: 'Registered Successfully'
        });
      });
    }
  }, {
    key: 'adminRegister',
    value: function adminRegister(req, res, next) {
      var password = _bcryptjs2.default.hashSync(req.body.password, 10);
      var params = [req.body.name, req.body.email, password, req.body.address, 'admin'];
      _index2.default.query('INSERT INTO users(name, email, password, address, roles) VALUES($1,$2,$3,$4,$5)', params, function (err) {
        if (err) {
          return next(err);
        }
        return res.status(200).json({
          request: {
            name: req.body.name.trim(),
            email: req.body.email.trim(),
            address: req.body.address.trim()
          },
          message: 'Registered Successfully'
        });
      });
    }
  }, {
    key: 'login',
    value: function login(req, res, next) {
      _index2.default.query('SELECT * from users WHERE email=$1', [req.body.email], function (err, data) {
        if (err) {
          return next(err);
        }
        if (data.rows.length > 0) {
          var compare = _bcryptjs2.default.compareSync(req.body.password, data.rows[0].password);
          if (compare) {
            var token = _jsonwebtoken2.default.sign({
              email: data.rows[0].email,
              userid: data.rows[0].id
            }, process.env.JWT_KEY);
            return res.status(200).json({
              message: 'Login Successful',
              token: token
            });
          }
          return res.status(403).json({
            message: 'Auth failed'
          });
        }
      });
    }
  }]);

  return AuthController;
}();

var authcontroller = new AuthController();
exports.default = authcontroller;