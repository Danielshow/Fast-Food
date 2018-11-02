const phonenumber = (number) => {
  const re = /\d{11}/;
  return re.test(number);
}

export default {
  verifyBody: (req, res, next) => {
    if (!req.body.food || req.body.food.trim().length < 1) {
      return res.status(400).send({
        status: 400,
        message: 'Request must contain food',
      });
    } if (!req.body.price) {
      return res.status(400).send({
        status: 400,
        message: 'Request must contain Price',
      });
    } if (isNaN(req.body.price)) {
      return res.status(400).send({
        status: 'Bad Request',
        message: 'Price must be Number',
      });
    }
    next();
  },
  verifyBodyandQuantity: (req, res, next) => {
    if (!req.body.food || req.body.food.trim().length < 1) {
      return res.status(400).send({
        status: 400,
        message: 'Request must contain food',
      });
    } if (!req.body.price || req.body.price.trim().length < 1) {
      return res.status(400).send({
        status: 400,
        message: 'Request must contain Price',
      });
    } if (!req.body.quantity || req.body.quantity.trim().length < 1) {
      return res.status(400).send({
        status: 400,
        message: 'Request must contain Quantity of foods',
      });
    } if (!req.body.address || req.body.address.trim().length < 1) {
      return res.status(400).send({
        status: 400,
        message: 'Request must contain Address of delivery',
      });
    } if (!req.body.phonenumber || req.body.phonenumber.trim().length < 1) {
      return res.status(400).send({
        status: 400,
        message: 'Request must contain Phone number',
      });
    } if (!phonenumber(req.body.phonenumber.trim())) {
      return res.status(400).send({
        status: 400,
        message: 'Phone number must contain 11 numbers',
      });
    }
    next();
  },
  verifyLenghtOfVariables: (req, res, next) => {
    const foodAdded = req.body.food.trim().split(',');
    const quantity = req.body.quantity.trim().split(',');
    const price = req.body.price.trim().split(',');
    if (foodAdded.length > quantity.length) {
      // partial content
      return res.status(206).send({
        status: 206,
        message: '1 or more quantity(s) is missing',
      });
    } if (quantity.length > foodAdded.length) {
      return res.status(206).send({
        status: 206,
        message: '1 or more food(s) is missing',
      });
    } if (quantity.length !== price.length) {
      return res.status(206).send({
        status: '206',
        message: 'Price for each food is incomplete',
      });
    }
    next();
  },
  isFileAvailable: (req, res, next) => {
    if (!req.file) {
      req.imagepath = 'https://res.cloudinary.com/fast-food/image/upload/v1539909326/l0cvazx1fh1x8cjeu9ag.jpg';
      return next();
    }
    return next();
    // return `${req.protocol}://${req.headers.host}/${req.file.path}`;
  },
};
