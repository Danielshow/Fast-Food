'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../db/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  verifyBody: function verifyBody(req, res, next) {
    if (!req.body.email || req.body.email.trim().length < 1) {
      return res.status(206).json({
        message: 'Email must be included in the body'
      });
    }if (!req.body.password || req.body.password.trim().length < 1) {
      return res.status(206).json({
        message: 'password must be included in the body'
      });
    }if (!req.body.address || req.body.address.trim().length < 1) {
      return res.status(206).json({
        message: 'Address must be included in the body'
      });
    }if (!req.body.name || req.body.name.trim().length < 1) {
      return res.status(206).json({
        message: 'Name must be included in the body'
      });
    }
    next();
  },
  validate: function validate(req, res, next) {
    var re = /\S+@\S+\.\S+/;
    var valid = re.test(req.body.email.trim());
    if (!valid) {
      return res.status(400).json({
        message: 'Email format is wrong'
      });
    }
    next();
  },
  verifySignin: function verifySignin(req, res, next) {
    if (!req.body.email || req.body.email.trim().length < 1) {
      return res.status(206).json({
        message: 'Email must be included in the body'
      });
    }if (!req.body.password || req.body.password.trim().length < 1) {
      return res.status(206).json({
        message: 'password must be included in the body'
      });
    }
    next();
  },
  isEmailExist: function isEmailExist(req, res, next) {
    _index2.default.query('SELECT email from users', function (err, data) {
      if (err) {
        return next(err);
      }
      for (var i = 0; i < data.rows.length; i += 1) {
        if (data.rows[i].email.toLowerCase() === req.body.email.trim().toLowerCase()) {
          return res.status(409).send({
            message: 'Email already exist'
          });
        }
      }
      next();
    });
  },
  isEmailInDb: function isEmailInDb(req, res, next) {
    _index2.default.query('SELECT email from users', function (err, data) {
      if (err) {
        return next(err);
      }
      for (var i = 0; i < data.rows.length; i += 1) {
        if (data.rows[i].email.toLowerCase() === req.body.email.trim().toLowerCase()) {
          return next();
        }
      }
      return res.status(400).json({
        message: 'Email does not exist'
      });
    });
  }
};