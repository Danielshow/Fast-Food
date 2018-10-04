import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db/index';
/* eslint-disable class-methods-use-this */
class AuthController {
  register(req, res, next) {
    const password = bcrypt.hashSync(req.body.password, 10);
    const params = [req.body.name, req.body.email, password, req.body.address, 'user'];
    db.query('INSERT INTO users(name, email, password, address, roles) VALUES($1,$2,$3,$4,$5)', params, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({
        request: {
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
    const params = [req.body.name, req.body.email, password, req.body.address, 'admin'];
    db.query('INSERT INTO users(name, email, password, address, roles) VALUES($1,$2,$3,$4,$5)', params, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({
        request: {
          name: req.body.name.trim(),
          email: req.body.email.trim(),
          address: req.body.address.trim(),
        },
        message: 'Registered Successfully',
      });
    });
  }

  login(req, res, next) {
    db.query('SELECT * from users WHERE email=$1', [req.body.email], (err, data) => {
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
            message: 'Login Successful',
            token,
          });
        }
        return res.status(403).json({
          message: 'Auth failed',
        });
      }
    });
  }
}

const authcontroller = new AuthController();
export default authcontroller;
