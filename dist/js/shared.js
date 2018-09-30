'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  verifyBody: function verifyBody(req, res) {
    if (!req.body.food) {
      return res.status(400).send({
        status: 'Bad Request',
        message: 'Request must contain food'
      });
    }if (!req.body.price) {
      return res.status(400).send({
        status: 'Bad Request',
        message: 'Request must contain Price'
      });
    }
    return true;
  },
  verifyBodyandQuantity: function verifyBodyandQuantity(req, res) {
    if (!req.body.food) {
      return res.status(400).send({
        status: 'Bad Request',
        message: 'Request must contain food'
      });
    }if (!req.body.price) {
      return res.status(400).send({
        status: 'Bad Request',
        message: 'Request must contain Price'
      });
    }if (!req.body.quantity) {
      return res.status(400).send({
        status: 'Bad Request',
        message: 'Request must contain Quantity of foods'
      });
    }
    return true;
  },
  verifyLenghtOfVariables: function verifyLenghtOfVariables(foodAdded, quantity, price, res) {
    if (foodAdded.length > quantity.length) {
      // partial content
      return res.status(206).send({
        status: 'Incomplete content',
        message: '1 or more quantity(s) is missing'
      });
    }if (quantity.length > foodAdded.length) {
      return res.status(206).send({
        status: 'Incomplete content',
        message: '1 or more food(s) is missing'
      });
    }if (quantity.length !== price.length) {
      return res.status(206).send({
        status: 'Incomplete content',
        message: 'Price for each food is incomlete'
      });
    }
    return true;
  },
  generateRandomNumber: function generateRandomNumber() {
    return Math.floor(Math.random() * 10 + 1);
  },
  generateID: function generateID(food) {
    var id = 0;
    if (food[food.length - 1].id === undefined) {
      id = 1;
    } else {
      id = food[food.length - 1].id + 1;
    }
    return id;
  }
};