import bcrypt from 'bcryptjs';
import db from '../db/index';
/* eslint-disable class-methods-use-this */
class AuthController {
  register(req, res) {
    // email, password, address, name
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
