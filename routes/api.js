const express = require('express');
const fs = require('fs');
// initialize router
const router = express.Router();

router.get('/orders', (req, res) => {
  const data = fs.readFileSync('data.json');
  const food = JSON.parse(data);
  res.send(food);
});

router.get('/orders/:id', (req, res) => {
  res.send('Get an order');
});

router.post('/orders', (req, res) => {
  res.send('Get a new order');
});

router.put('/orders/:id', (req, res) => {
  res.send('Update the status of an order');
});
module.exports = router;
