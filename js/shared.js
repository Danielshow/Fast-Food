export default {
  verifyBody(req, res) {
    if (!(req.body.food && req.body.price)) {
      return res.status(400).send({
        status: 'Bad Request',
        message: 'Request must contain food and Price',
      });
    }
    return true;
  },
  verifyBodyandQuantity(req, res) {
    if (!(req.body.food && req.body.price && req.body.quantity)) {
      return res.send({
        status: 'Bad Request',
        message: 'Request must contain food, Price and quantity',
      });
    }
    return true;
  },
  verifyLenghtOfVariables(foodAdded, quantity, price, res) {
    if (foodAdded.length > quantity.length) {
      return res.send({
        status: 'Incomplete content',
        message: '1 or more quantity(s) is missing',
      });
    } if (quantity.length > foodAdded.length) {
      return res.send({
        status: 'Incomplete content',
        message: '1 or more food is missing',
      });
    } if (quantity.length !== price.length) {
      return res.send({
        status: 'Incomplete content',
        message: 'price for each food must be added',
      });
    }
    return true;
  },
  generateRandomNumber() {
    return Math.floor(Math.random() * 10);
  },
  generateID(food) {
    let id = 0;
    if (food[food.length - 1].id === undefined) {
      id = 1;
    } else {
      id = food[food.length - 1].id + 1;
    }
    return id;
  },
};
