import db from '../db/index';

const isPassword = (password) => {
  const re = /\w+/;
  return re.test(password);
};

const isSpaceInPassword = (password) => {
  const re = /\s+/;
  return re.test(password);
};

export default {
  verifyBody: (req, res, next) => {
    if (!req.body.email || req.body.email.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'Email must be included in the body',
      });
    } if (!req.body.password) {
      return res.status(206).json({
        status: 206,
        message: 'password must be included in the body',
      });
    } if (!req.body.address || req.body.address.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'Address must be included in the body',
      });
    } if (!req.body.name || req.body.name.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'Name must be included in the body',
      });
    }
    return next();
  },
  verifyRoles: (req, res, next) => {
    const roles = req.body.roles.toLowerCase();
    if (!req.body.roles || req.body.roles.trim().length < 1) {
      return res.status(400).json({
        status: 400,
        message: 'roles must be included in the body',
      });
    } if (roles !== 'admin' && roles !== 'user') {
      return res.status(400).json({
        status: '400',
        message: 'Roles must be either Admin or Users',
      });
    }
    return next();
  },
  validate: (req, res, next) => {
    const re = /\S+@\S+\.\S+/;
    const valid = re.test(req.body.email.trim());
    if (!valid) {
      return res.status(400).json({
        status: 400,
        message: 'Email format is wrong',
      });
    }
    return next();
  },
  verifySignin: (req, res, next) => {
    if (!req.body.email || req.body.email.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'Email must be included in the body',
      });
    } if (!req.body.password || req.body.password.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'password must be included in the body',
      });
    }
    return next();
  },
  isEmailExist: (req, res, next) => {
    db.query('SELECT email from users', (err, data) => {
      if (err) {
        return next(err);
      }
      for (let i = 0; i < data.rows.length; i += 1) {
        if (data.rows[i].email.toLowerCase() === req.body.email.trim().toLowerCase()) {
          return res.status(409).send({
            status: 400,
            message: 'Email already exist',
          });
        }
      }
      return next();
    });
  },
  isEmailInDb: (req, res, next) => {
    db.query('SELECT email from users', (err, data) => {
      if (err) {
        return next(err);
      }
      for (let i = 0; i < data.rows.length; i += 1) {
        if (data.rows[i].email.toLowerCase() === req.body.email.trim().toLowerCase()) {
          return next();
        }
      }
      return res.status(400).json({
        status: 400,
        message: 'Email does not exist',
      });
    });
  },
  isValidID: (req, res, next) => {
    if (isNaN(req.params.id) || Number(req.params.id) > 9000) {
      return res.status(403).json({
        status: 403,
        message: 'ID must be a number and less than 9000',
      });
    }
    return next();
  },
  confirmPassword: (req, res, next) => {
    if (!req.body.password || !req.body.confirmpassword) {
      return res.status(400).json({
        status: 400,
        message: 'body must contain password and confirmpassword',
      });
    }
    if (req.body.password.length < 6) {
      return res.status(206).json({
        status: 206,
        message: 'password must be a minimum of 6 characters',
      });
    }
    if (req.body.password.trim() !== req.body.confirmpassword.trim()) {
      return res.status(400).json({
        status: 400,
        message: 'password and confirmpassword not equal',
      });
    }
    return next();
  },
  isPasswordValid: (req, res, next) => {
    if (!isPassword(req.body.password)) {
      return res.status(400).json({
        status: 400,
        message: 'Password must contain Letters or numbers',
      });
    }
    if (isSpaceInPassword(req.body.password)) {
      return res.status(400).json({
        status: 400,
        message: 'password must not contain spaces',
      });
    }
    return next();
  },
};
