import { Router } from 'express';
import fs from 'fs';
// initialize router
const router = Router();

// get food list available on the webpage
router.get('/foodlist', (req, res) => {
  const data = fs.readFileSync('data.json');
  const food = JSON.parse(data);
  return res.status(200).send(food.foodList);
});
// post new food to foodlist by admin
router.post('/foodlist', (req, res) => {
  const orderFood = req.body;
  const data = fs.readFileSync('data.json');
  const food = JSON.parse(data);
  food.foodList.push(orderFood);
  fs.writeFile('data.json', JSON.stringify(food, null, 2), (err) => {
    if (err) {
      return res.status(500).send({
        error: 'Error making request',
      });
    }
    return res.status(200).send({
      request: req.body,
      Success: 'Food Added Successfully',
    });
  });
});
// Admin can update food from foodList
router.put('/foodlist/:id', (req, res) => {
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
// get the price of all food ordered by admin
router.get('/totalprice', (req, res) => {
  const data = fs.readFileSync('data.json');
  const newData = JSON.parse(data);
  let total = 0;
  for (let i = 0; i < newData.userOrder.length; i += 1) {
    total += newData.userOrder[i].price;
  }
  res.status(200).send({
    total,
    status: 'Success',
  });
});
export default router;
