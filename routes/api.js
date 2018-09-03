const express = require('express');

// initialize router
const router = express.Router();

router.get('/orders', (req, res) => {
  res.send('Orders Route');
});

router.get('/orders/:id', (req, res) => {
  res.send('Orders Route');
});

router.post('/orders', (req, res) => {
  res.send('Get a new order');
});

router.put('/orders/:id', (req, res) => {
  res.send('Update the status of an order');
});
module.exports = router;
