const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
// initialize router
const router = express.Router();

router.post('/register', (req, res) => {
  const { email } = req.body;
  const password = bcrypt.hashSync(req.body.password, 8);
  const info = {
    email,
    password,
  };
  const data = fs.readFileSync('login-data.json');
  const newMembers = JSON.parse(data);
  for (let i = 0; i < newMembers.registered.length; i += 1) {
    const member = newMembers.registered[i];
    if (member.email === email) {
      return res.status(401).send({
        register: false,
        status: 'Email has already been registered',
      });
    }
  }
  newMembers.registered.push(info);
  fs.writeFileSync('login-data.json', JSON.stringify(newMembers, null, 2));
  const token = jwt.sign({ id: req.body.email }, config.secret, { expiresIn: 86400 });
  return res.status(200).send({
    success: 'Registered Successfully',
    token,
  });
});

router.get('/me', (req, res) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({
      auth: false,
      message: 'No Token Provided.',
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status({
        success: false,
        message: 'Failed to authenticate',
      });
    }
    // res.status(200).send(decoded)
    const data = fs.readFileSync('login-data.json');
    const realData = JSON.parse(data);
    for (let i = 0; i < realData.registered.length; i += 1) {
      const user = realData.registered[i];
      if (user.email === decoded.id) {
        return res.status(200).send({
          email: user.email,
          profile: 'This is your page',
        });
      }
    }
    return res.status(400).send('No user found');
  });
  return res.status(401).send({
    status: 'No registered User',
  });
});

router.post('/login', (req, res) => {
  // const loginDetails = req.body;
  const data = fs.readFileSync('login-data.json');
  const realData = JSON.parse(data);

  for (let i = 0; i < realData.registered.length; i += 1) {
    const user = realData.registered[i];
    if (user.email === req.body.email) {
      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) {
        return res.status(401).send({
          login: false,
          reason: 'Incorrect password',
        });
      }
      const token = jwt.sign({ id: user.email }, config.secret, { expiresIn: 86400 });
      return res.status(200).send({
        login: true,
        token,
      });
    }
  }
  return res.send({
    status: 'No registered User',
  });
});
//Logout, set token to null
router.get('/logout', (req, res) => {
  res.status(200).send({
    status: true,
    token: null,
  });
});
module.exports = router;
