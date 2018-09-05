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
  newMembers.registered.push(info);
  fs.writeFileSync('login-data.json', JSON.stringify(newMembers, null, 2));
  const token = jwt.sign({ id: req.body.email }, config.secret, { expiresIn: 86400 });
  res.status(200).send({
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
    })
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status({
        auth: false,
        message: 'Failed to authenticate',
      });
    }
    // res.status(200).send(decoded)
    const data = fs.readFileSync('login-data.json');
    const realData = JSON.parse(data);
    for (let i=0; i<realData.registered.length; i++){
      if (realData.registered[i].email === decoded.id){
        res.send(realData.registered[i]);
      }
    }
  });
});

router.post('/login', (req, res) => {
  // const loginDetails = req.body;
});

router.post('/profile/id', (req, res) => {
  // const loginDetails = req.body;
});
module.exports = router;
