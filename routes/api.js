const express = require('express');
const fs = require('fs');
// initialize router
const router = express.Router();
// get orders to post on webpage
router.get('/orders', (req, res) => {
  const data = fs.readFileSync('data.json');
  const food = JSON.parse(data);
  return res.status(200).send(food.foodList);
});
// get orders by ID
router.get('/orders/:id', (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync('data.json');
  const food = JSON.parse(data).foodList;
  for (let i = 0; i < food.length; i += 1) {
    if (food[i].id === Number(id)) {
      return res.status(200).send(food[i]);
    }
  }
  return res.status(404).send({
    status: 'Food Not found',
  });
});
// post new orders to the homepage
router.post('/orders', (req, res) => {
  const newFood = req.body;
  const data = fs.readFileSync('data.json');
  const food = JSON.parse(data);
  food.foodList.push(newFood);
  fs.writeFile('data.json', JSON.stringify(food, null, 2), (err) => {
    if (err) {
      return res.send({
        error: 'Error adding food',
      });
    }
    return res.status(200).send({
      request: req.body,
      Success: 'Food Added',
    });
  });
});
// Edit one food in FoodList
router.put('/orders/:id', (req, res) => {
  const params = req.body;
  const { id } = req.params;
  const data = fs.readFileSync('data.json');
  const food = JSON.parse(data);
  for (let i = 0; i < food.foodList.length; i += 1) {
    if (food.foodList[i].id === Number(id)) {
      // food, price, status
      const newfood = food.foodList[i];
      newfood.food = params.food;
      newfood.price = params.price;
      newfood.status = params.status;
      fs.writeFile('data.json', JSON.stringify(food, null, 2), (err) => {
        if (err) {
          res.send({
            error: 'Error updating food',
          });
        } else {
          res.status(200).send({
            request: food.foodList[i],
            Sucess: 'Food Updated',
          });
        }
      });
    }
  }
});

module.exports = router;
