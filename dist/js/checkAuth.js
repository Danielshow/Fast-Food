'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _index = require('../db/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  verifyToken: function verifyToken(req, res, next) {
    try {
      var token = req.headers.authorization.split(' ')[1];
      var decoded = _jsonwebtoken2.default.verify(token, process.env.JWT_KEY);
      req.decoded = decoded;
      return next();
    } catch (err) {
      return res.status(401).json({
        message: 'Authentication fail'
      });
    }
  },

  verifyAdminToken: function verifyAdminToken(req, res, next) {
    try {
      var token = req.headers.authorization.split(' ')[1];
      var decoded = _jsonwebtoken2.default.verify(token, process.env.JWT_KEY);
      req.decoded = decoded;
      _index2.default.query('SELECT * from users WHERE email=$1', [decoded.email], function (err, data) {
        if (err) {
          return next(err);
        }
        if (data.rows.length > 0) {
          if (data.rows[0].roles === 'admin') {
            return next();
          }
          return res.status(401).json({
            message: 'Authentication fail'
          });
        }
      });
    } catch (err) {
      return res.status(401).json({
        message: 'Authentication fail'
      });
    }
  }
};