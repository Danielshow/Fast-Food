'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  verifyBody: function verifyBody(req, res, next) {
    if (!req.body.food || req.body.food.trim().length < 1) {
      return res.status(400).send({
        status: 400,
        message: 'Request must contain food'
      });
    }if (!req.body.price) {
      return res.status(400).send({
        status: 400,
        message: 'Request must contain Price'
      });
    }if (isNaN(req.body.price)) {
      return res.status(400).send({
        status: 'Bad Request',
        message: 'Price must be Number'
      });
    }
    next();
  },
  verifyBodyandQuantity: function verifyBodyandQuantity(req, res, next) {
    if (!req.body.food || req.body.food.trim().length < 1) {
      return res.status(400).send({
        status: 400,
        message: 'Request must contain food'
      });
    }if (!req.body.price || req.body.price.trim().length < 1) {
      return res.status(400).send({
        status: 400,
        message: 'Request must contain Price'
      });
    }if (!req.body.quantity || req.body.quantity.trim().length < 1) {
      return res.status(400).send({
        status: 400,
        message: 'Request must contain Quantity of foods'
      });
    }
    next();
  },
  verifyLenghtOfVariables: function verifyLenghtOfVariables(req, res, next) {
    var foodAdded = req.body.food.trim().split(',');
    var quantity = req.body.quantity.trim().split(',');
    var price = req.body.price.trim().split(',');
    if (foodAdded.length > quantity.length) {
      // partial content
      return res.status(206).send({
        status: 206,
        message: '1 or more quantity(s) is missing'
      });
    }if (quantity.length > foodAdded.length) {
      return res.status(206).send({
        status: 206,
        message: '1 or more food(s) is missing'
      });
    }if (quantity.length !== price.length) {
      return res.status(206).send({
        status: '206',
        message: 'Price for each food is incomplete'
      });
    }
    next();
  },
  imagePicker: function imagePicker(req) {
    if (!req.file) {
      // set default image
      return req.protocol + '://' + req.headers.host + '/uploads\\default.jpg';
    }
    return req.protocol + '://' + req.headers.host + '/' + req.file.path;
  }
};