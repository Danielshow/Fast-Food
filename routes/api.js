import { Router } from 'express';
import fs from 'fs';
import read from './read_file';
import body from '../js/shared';

// initialize router
const router = Router();

router.get('/', (req, res) => {
  res.status(200).send({
    product: 'Food Fast API',
    routes: '/ before every route',
  });
});
// get user orders for admin page
router.get('/orders', (req, res) => {
  const food = read.readFromFile();
  return res.status(200).send(food.userOrder);
});
// get one order by ID
router.get('/orders/:id', (req, res) => {
  const { id } = req.params;
  const food = read.readFromFile().userOrder;
  for (let i = 0; i < food.length; i += 1) {
    if (food[i].id === Number(id)) {
      return res.status(200).send(food[i]);
    }
  }
  return res.status(404).send({
    status: 'Food Not found',
  });
});
// get orders by a specific logged in user by their user_id
router.get('/userorder/:id', (req, res) => {
  const { id } = req.params;
  let food = read.readFromFile().userOrder;
  food = food.filter(x => x.user_id === Number(id));
  if (food.length > 0) {
    res.status(200).send(food);
  } else {
    res.status(404).send({
      status: 'error',
      message: 'Not Found',
    });
  }
});
// post new orders to the admin page by users
router.post('/orders', (req, res) => {
  const newFood = req.body;
  body.verifyBody(req, res);
  // split the food and price if they are more than one
  const foodAdded = newFood.food.split(',');
  const quantity = newFood.quantity.split(',');
  let price = newFood.price.split(',');
  // check if food and quantity are of same length
  const verify = body.verifyLenghtOfVariables(foodAdded, quantity, price, res);
  if (!(verify === true)) {
    return;
  }
  // multiply quantity by their price to get total price
  let addedPrice = 0;
  for (let i = 0; i < quantity.length; i += 1) {
    addedPrice += Number(price[i]) * Number(quantity[i]);
  }
  price = addedPrice;
  // generate random number
  const userId = body.generateRandomNumber();
  const food = read.readFromFile();
  const id = body.generateID(food.userOrder);
  const updatedFood = {
    id,
    food: foodAdded,
    quantity,
    price,
    status: 'Pending',
    user_id: userId,
  };
  food.userOrder.push(updatedFood);
  fs.writeFile('data.json', JSON.stringify(food, null, 2), (err) => {
    if (err) {
      return res.status(500).send({
        error: 'Error adding food',
      });
    }
    return res.status(200).send({
      request: updatedFood,
      success: 'Food Added to order list Successfully',
    });
  });
});
// Edit order Status declined, completed, pending by admin
router.put('/orders/:id', (req, res) => {
  // status must be passed with the body
  const { status } = req.body;
  if (Object.keys(req.body).length === 0) {
    return res.status(204).send({
      status: 'No content',
    });
  }

  const { id } = req.params;
  const food = read.readFromFile();
  for (let i = 0; i < food.userOrder.length; i += 1) {
    if (food.userOrder[i].id === Number(id)) {
      food.userOrder[i].status = status;
      fs.writeFile('data.json', JSON.stringify(food, null, 2), (err) => {
        if (err) {
          return res.status(500).send({
            error: 'Error updating food',
          });
        }
        return res.status(200).send({
          request: food.userOrder[i],
          success: 'Status Updated',
        });
      });
    }
  }
});

export default router;
