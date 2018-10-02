export default {
  verifyBody: (req, res, next) => {
    if (!req.body.email) {
      // partial content
      return res.status(206).json({
        message: 'Email must be included in the body',
      });
    } if (!req.body.password) {
      // partial content
      return res.status(206).json({
        message: 'password must be included in the body',
      });
    } if (!req.body.address) {
      // partial content
      return res.status(206).json({
        message: 'Address must be included in the body',
      });
    } if (!req.body.name) {
      // partial content
      return res.status(206).json({
        message: 'Name must be included in the body',
      });
    }
    next();
  },
  validate: (req, res, next) => {
    const re = /\S+@\S+\.\S+/;
    const valid = re.test(req.body.email);
    if (!valid) {
      return res.status(400).json({
        message: 'Email format is wrong',
      });
    }
    next();
  },
};
