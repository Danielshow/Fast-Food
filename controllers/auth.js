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
    return res.status(200).json({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      address: req.body.address,
    });
  }
}

const authcontroller = new AuthController();
export default authcontroller;
