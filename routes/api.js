const express = require('express');
const fs = require('fs');
// initialize router
const router = express.Router();
// get orders to post on webpage
router.get('/orders', (req, res) => {
  const data = fs.readFileSync('data.json');
  const food = JSON.parse(data);
  res.send(food.foodList);
});

router.get('/orders/:id', (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync('data.json');
  const food = JSON.parse(data).foodList;
  for (let i = 0; i < food.length; i += 1) {
    if (food[i].id === Number(id)) {
      res.send(food[i]);
    }
  }
});

router.post('/orders', (req, res) => {
  const newFood = req.body;
  const data = fs.readFileSync('data.json');
  const food = JSON.parse(data);
  food.foodList.push(newFood);
  fs.writeFile('data.json', JSON.stringify(food, null, 2), (err) => {
    if (err) {
      res.send({
        error: 'Error adding food',
      });
    } else {
      res.send({
        request: req.body,
        Sucess: 'Food Added',
      });
    }
  });
});

router.put('/orders/:id', (req, res) => {
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
