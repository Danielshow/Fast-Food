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
// get foodlist by ID
router.get('/foodlist/:id', (req, res) => {
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
// post new food to foodlist by admin
router.post('/foodlist', (req, res) => {
  // food list must contain name of food, price, id
  const orderFood = req.body;
  // post object must not be empty
  if (Object.keys(orderFood).length === 0) {
    return res.status(204).send({
      status: 'No content',
      message: 'Request can not be empty',
    });
  } if (!(orderFood.food && orderFood.price)) {
    return res.status(400).send({
      status: 'Bad Request',
      message: 'Request must contain food, price and ID',
    });
  }
  const data = fs.readFileSync('data.json');
  const food = JSON.parse(data);
  // Generate Unique ID
  let id;
  if (food.foodList[food.foodList.length - 1] === undefined) {
    id = 1;
  } else {
    id = food.foodList[food.foodList.length - 1].id + 1;
  }

  const updatedFood = {
    id,
    food: orderFood.food,
    price: orderFood.price,
  }
  food.foodList.push(updatedFood);
  fs.writeFile('data.json', JSON.stringify(food, null, 2), (err) => {
    if (err) {
      return res.status(500).send({
        error: 'Error making request',
      });
    }
    return res.status(200).send({
      request: updatedFood,
      success: 'Food Added Successfully',
    });
  });
});
// Admin can update food from foodList
router.put('/foodlist/:id', (req, res) => {
  const reqData = req.body;
  if (Object.keys(reqData).length === 0) {
    return res.status(204).send({
      status: 'No content',
    });
  } if (!(reqData.food && reqData.price)) {
    return res.status(400).send({
      status: 'Bad Request',
      message: 'Request must contain food and price',
    });
  }
  const { id } = req.params;
  const data = fs.readFileSync('data.json');
  const food = JSON.parse(data);
  for (let i = 0; i < food.foodList.length; i += 1) {
    if (food.foodList[i].id === Number(id)) {
      // food, price, status
      const newfood = food.foodList[i];
      newfood.food = reqData.food;
      newfood.price = reqData.price;
      fs.writeFile('data.json', JSON.stringify(food, null, 2), (err) => {
        if (err) {
          return res.send({
            error: 'Error updating food',
          });
        }
        return res.status(200).send({
          request: food.foodList[i],
          success: 'Food Updated',
        });
      });
    }
  }
});
// Delete food from foodList
router.delete('/foodlist/:id', (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync('data.json');
  const food = JSON.parse(data);
  food.foodList = food.foodList.filter(x => x.id !== Number(id));
  fs.writeFile('data.json', JSON.stringify(food, null, 2), (err) => {
    if (err) {
      return res.status(500).send({
        error: 'error deleting food',
      });
    }
    return res.status(200).send({
      success: 'Food deleted',
    });
  });
});
// get the price of all food ordered by users
router.get('/totalprice', (req, res) => {
  const data = fs.readFileSync('data.json');
  const newData = JSON.parse(data);
  let total = 0;
  for (let i = 0; i < newData.userOrder.length; i += 1) {
    total += newData.userOrder[i].price;
  }
  return res.status(200).send({
    total,
    status: 'Success',
  });
});
export default router;
