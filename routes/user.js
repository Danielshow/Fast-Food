const express = require('express');
const fs = require('fs');
// initialize router
const router = express.Router();
// get user order
router.get('/user-order', (req, res) => {
  const data = fs.readFileSync('data.json');
  const food = JSON.parse(data);
  return res.status(200).send(food.userOrder);
});
// post user order
router.post('/user-order', (req, res) => {
  const orderFood = req.body;
  const data = fs.readFileSync('data.json');
  const food = JSON.parse(data);
  food.userOrder.push(orderFood);
  fs.writeFile('data.json', JSON.stringify(food, null, 2), (err) => {
    if (err) {
      return res.status(500).send({
        error: 'Error making request',
      });
    }
    return res.status(200).send({
      request: req.body,
      Success: 'Food Ordered Successfully',
    });
  });
});
// Edit order Status
router.put('/user-order/:id', (req, res) => {
  // declined, pending, or completed
  const params = req.body;
  const { id } = req.params;
  const data = fs.readFileSync('data.json');
  const food = JSON.parse(data);
  for (let i = 0; i < food.foodList.length; i += 1) {
    if (food.foodList[i].id === Number(id)) {
      food.foodList[i].status = params.status;
      fs.writeFile('data.json', JSON.stringify(food, null, 2), (err) => {
        if (err) {
          res.send({
            error: 'Error updating food',
          });
        } else {
          res.send({
            request: food.foodList[i],
            Sucess: 'Status Updated',
          });
        }
      });
    }
  }
});

module.exports = router;
