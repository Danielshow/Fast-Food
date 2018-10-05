import jwt from 'jsonwebtoken';
import db from '../db/index';

export default {
  verifyToken: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.decoded = decoded;
      return next();
    } catch (err) {
      if (req.headers.authorization) {
        return res.status(401).json({
          message: 'Authentication fail, Incorrect Token',
        });
      }
      return res.status(403).json({
        message: 'Authentication fail, Please provide Token',
      });
    }
  },

  verifyAdminToken: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.decoded = decoded;
      db.query('SELECT * from users WHERE email=$1', [decoded.email], (err, data) => {
        if (err) {
          return next(err);
        }
        if (data.rows.length > 0) {
          if (data.rows[0].roles === 'admin') {
            return next();
          }
          return res.status(403).json({
            message: 'You are not authorize to do this',
          });
        }
      });
    } catch (err) {
      if (req.headers.authorization) {
        return res.status(401).json({
          message: 'Authentication fail, Incorrect Token',
        });
      }
      return res.status(403).json({
        message: 'Authentication fail, Please provide Token',
      });
    }
  },

  isUserResource: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.decoded = decoded;
      if (Number(decoded.userid) !== Number(req.params.id)) {
        return res.status(403).send({
          message: 'Auth Fail, You are not authorize to view this resource',
        });
      }
      return next();
    } catch (err) {
      if (req.headers.authorization) {
        return res.status(401).json({
          message: 'Authentication fail, Incorrect Token',
        });
      }
      return res.status(403).json({
        message: 'Authentication fail, Please provide Token',
      });
    }
  },
};
