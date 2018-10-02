import db from '../db/index';

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
  verifySignin: (req, res, next) => {
    if (!req.body.email) {
      return res.status(206).json({
        message: 'Email must be included in the body',
      });
    } if (!req.body.password) {
      return res.status(206).json({
        message: 'password must be included in the body',
      });
    }
    next();
  },
  isEmailExist: (req, res, next) => {
    db.query('SELECT email from users', (err, data) => {
      if (err) {
        return next(err);
      }
      for (let i = 0; i < data.rows.length; i += 1) {
        if (data.rows[i].email === req.body.email) {
          return res.status(400).send({
            message: 'Email already exist',
          });
        }
      }
      next();
    });
  },
  isEmailInDb: (req, res, next) => {
    db.query('SELECT email from users', (err, data) => {
      if (err) {
        return next(err);
      }
      for (let i = 0; i < data.rows.length; i += 1) {
        if (data.rows[i].email === req.body.email) {
          return next();
        }
      }
      return res.status(400).json({
        message: 'Email does not exist',
      });
    });
  },
};
