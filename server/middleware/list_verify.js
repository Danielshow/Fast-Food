const listVerify = (req, res, next) => {
  const price = req.body.price.split(',');
  const food = req.body.food.split(',');
  const quantity = req.body.quantity.split(',');

  for (let i = 0; i < price.length; i += 1) {
    if (isNaN(price[i].trim()) || isNaN(quantity[i].trim())) {
      return res.status(400).json({
        message: 'Bad request, Price and quantity must be a Number',
      });
    }
    if (food[i].trim() === '') {
      return res.status(400).json({
        message: `Bad Request, Food at position ${i + 1} cannot be empty`,
      });
    }
  }
  return next();
};

export default listVerify;
