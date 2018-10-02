import bcrypt from 'bcryptjs';
import db from '../db/index';
import valid from '../js/shared';
/* eslint-disable class-methods-use-this */
class AuthController {
  register(req, res) {
    // email, password, address, name
    const isValid = valid.validate(req.body.email);
    if (!isValid) {
      return res.status(400).json({
        message: 'Email format is wrong',
      });
    }
    const password = bcrypt.hashSync('req.body.password', 10);
    const params = [req.body.name, req.body.email, password, req.body.address];
    db.query('INSERT INTO users(name, email, password, address) VALUES($1,$2,$3,$4)', params, (err) => {
      if (err) {
        console.log(err);
      }
      return res.status(200).json({
        request: {
          name: req.body.name,
          email: req.body.email,
          address: req.body.address,
        },
        message: 'Registered Successfully',
      });
    });
  }
}

const authcontroller = new AuthController();
export default authcontroller;
