'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  verifyBody: function verifyBody(req, res, next) {
    if (!req.body.email) {
      // partial content
      return res.status(206).json({
        message: 'Email must be included in the body'
      });
    }if (!req.body.password) {
      // partial content
      return res.status(206).json({
        message: 'password must be included in the body'
      });
    }if (!req.body.address) {
      // partial content
      return res.status(206).json({
        message: 'Address must be included in the body'
      });
    }if (!req.body.name) {
      // partial content
      return res.status(206).json({
        message: 'Name must be included in the body'
      });
    }
    next();
  }
};