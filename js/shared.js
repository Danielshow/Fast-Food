export default {
  verifyBody: (req, res, next) => {
    if (!req.body.food || req.body.food.trim().length < 1) {
      return res.status(400).send({
        status: 'Bad Request',
        message: 'Request must contain food',
      });
    } if (!req.body.price) {
      return res.status(400).send({
        status: 'Bad Request',
        message: 'Request must contain Price',
      });
    }
    next();
  },
  verifyBodyandQuantity: (req, res, next) => {
    if (!req.body.food || req.body.food.trim().length < 1) {
      return res.status(400).send({
        status: 'Bad Request',
        message: 'Request must contain food',
      });
    } if (!req.body.price || req.body.price.trim().length < 1) {
      return res.status(400).send({
        status: 'Bad Request',
        message: 'Request must contain Price',
      });
    } if (!req.body.quantity || req.body.quantity.trim().length < 1) {
      return res.status(400).send({
        status: 'Bad Request',
        message: 'Request must contain Quantity of foods',
      });
    }
    next();
  },
  verifyLenghtOfVariables: (req, res, next) => {
    const foodAdded = req.body.food.split(',');
    const quantity = req.body.quantity.split(',');
    const price = req.body.price.split(',');
    if (foodAdded.length > quantity.length) {
      // partial content
      return res.status(206).send({
        status: 'Incomplete content',
        message: '1 or more quantity(s) is missing',
      });
    } if (quantity.length > foodAdded.length) {
      return res.status(206).send({
        status: 'Incomplete content',
        message: '1 or more food(s) is missing',
      });
    } if (quantity.length !== price.length) {
      return res.status(206).send({
        status: 'Incomplete content',
        message: 'Price for each food is incomplete',
      });
    }
    next();
  },
  imagePicker: (req) => {
    if (!req.file) {
      // set default image
      return `${req.protocol}://${req.headers.host}/uploads\\default.jpg`;
    }
    return `${req.protocol}://${req.headers.host}/${req.file.path}`;
  },
};
