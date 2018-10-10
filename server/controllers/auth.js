import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db/index';
/* eslint-disable class-methods-use-this */
class AuthController {
  register(req, res, next) {
    const password = bcrypt.hashSync(req.body.password, 10);
    const params = [req.body.name.trim().toLowerCase(), req.body.email.trim().toLowerCase(), password, req.body.address.trim().toLowerCase(), 'user'];
    db.query('INSERT INTO users(name, email, password, address, roles) VALUES($1,$2,$3,$4,$5)', params, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({
        TYPE: 'POST',
        status: 200,
        data: {
          name: req.body.name.trim(),
          email: req.body.email.trim(),
          address: req.body.address.trim(),
        },
        message: 'Registered Successfully',
      });
    });
  }

  adminRegister(req, res, next) {
    const password = bcrypt.hashSync(req.body.password, 10);
    const params = [req.body.name.trim().toLowerCase(), req.body.email.trim().toLowerCase(), password, req.body.address.trim().toLowerCase(), 'admin'];
    db.query('INSERT INTO users(name, email, password, address, roles) VALUES($1,$2,$3,$4,$5)', params, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({
        TYPE: 'POST',
        status: 200,
        data: {
          name: req.body.name.trim(),
          email: req.body.email.trim(),
          address: req.body.address.trim(),
        },
        message: 'Registered Successfully',
      });
    });
  }

  login(req, res, next) {
    db.query('SELECT * from users WHERE email=$1', [req.body.email.toLowerCase()], (err, data) => {
      if (err) {
        return next(err);
      }
      if (data.rows.length > 0) {
        const compare = bcrypt.compareSync(req.body.password, data.rows[0].password);
        if (compare) {
          const token = jwt.sign({
            email: data.rows[0].email,
            userid: data.rows[0].id,
          }, process.env.JWT_KEY);
          return res.status(200).json({
            TYPE: 'POST',
            status: 200,
            data: {
              token,
            },
            message: 'Login Successful',
          });
        }
        return res.status(403).json({
          TYPE: 'POST',
          status: 403,
          message: 'Invalid Credentials',
        });
      }
    });
  }

  logout(req, res, next) {
    res.status(200).json({
      type: 'GET',
      status: 200,
      data: {
        token: null,
      },
      message: 'User logged out Successfully',
    });
  }

  getMe(req, res, next) {
    db.query('SELECT * from users where id=$1', [req.decoded.userid], (err, data) => {
      if (err) {
        return next(err);
      }
      if (data.rows.length > 0) {
        return res.status(200).send({
          type: 'GET',
          status: 200,
          data: data.rows,
          message: 'User returned Successfully',
        });
      }
      return res.status(404).json({
        status: 400,
        message: 'User not found',
      });
    });
  }
}

const authcontroller = new AuthController();
export default authcontroller;
