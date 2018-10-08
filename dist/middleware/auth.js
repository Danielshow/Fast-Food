'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../db/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isPassword = function isPassword(password) {
  var re = /\w+/;
  return re.test(password);
};

var isSpaceInPassword = function isSpaceInPassword(password) {
  var re = /\s+/;
  return re.test(password);
};

exports.default = {
  verifyBody: function verifyBody(req, res, next) {
    if (!req.body.email || req.body.email.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'Email must be included in the body'
      });
    }if (!req.body.password) {
      return res.status(206).json({
        status: 206,
        message: 'password must be included in the body'
      });
    }if (!req.body.address || req.body.address.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'Address must be included in the body'
      });
    }if (!req.body.name || req.body.name.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'Name must be included in the body'
      });
    }
    return next();
  },
  verifyRoles: function verifyRoles(req, res, next) {
    var roles = req.body.roles.toLowerCase();
    if (!req.body.roles || req.body.roles.trim().length < 1) {
      return res.status(400).json({
        status: 400,
        message: 'roles must be included in the body'
      });
    }if (roles !== 'admin' && roles !== 'user') {
      return res.status(400).json({
        status: '400',
        message: 'Roles must be either Admin or Users'
      });
    }
    return next();
  },
  validate: function validate(req, res, next) {
    var re = /\S+@\S+\.\S+/;
    var valid = re.test(req.body.email.trim());
    if (!valid) {
      return res.status(400).json({
        status: 400,
        message: 'Email format is wrong'
      });
    }
    return next();
  },
  verifySignin: function verifySignin(req, res, next) {
    if (!req.body.email || req.body.email.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'Email must be included in the body'
      });
    }if (!req.body.password || req.body.password.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'password must be included in the body'
      });
    }
    return next();
  },
  isEmailExist: function isEmailExist(req, res, next) {
    _index2.default.query('SELECT email from users', function (err, data) {
      if (err) {
        return next(err);
      }
      for (var i = 0; i < data.rows.length; i += 1) {
        if (data.rows[i].email.toLowerCase() === req.body.email.trim().toLowerCase()) {
          return res.status(409).send({
            status: 400,
            message: 'Email already exist'
          });
        }
      }
      return next();
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
        status: 400,
        message: 'Email does not exist'
      });
    });
  },
  isValidID: function isValidID(req, res, next) {
    if (isNaN(req.params.id) || Number(req.params.id) > 9000) {
      return res.status(403).json({
        status: 403,
        message: 'ID must be a number and less than 9000'
      });
    }
    return next();
  },
  confirmPassword: function confirmPassword(req, res, next) {
    if (!req.body.password || !req.body.confirmpassword) {
      return res.status(400).json({
        status: 400,
        message: 'body must contain password and confirmpassword'
      });
    }
    if (req.body.password.length < 6) {
      return res.status(206).json({
        status: 206,
        message: 'password must be a minimum of 6 characters'
      });
    }
    if (req.body.password.trim() !== req.body.confirmpassword.trim()) {
      return res.status(400).json({
        status: 400,
        message: 'password and confirmpassword not equal'
      });
    }
    return next();
  },
  isPasswordValid: function isPasswordValid(req, res, next) {
    if (!isPassword(req.body.password)) {
      return res.status(400).json({
        status: 400,
        message: 'Password must contain Letters or numbers'
      });
    }
    if (isSpaceInPassword(req.body.password)) {
      return res.status(400).json({
        status: 400,
        message: 'password must not contain spaces'
      });
    }
    return next();
  }
};