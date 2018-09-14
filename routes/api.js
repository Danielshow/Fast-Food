import { Router } from 'express';
import fs from 'fs';

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
  const data = fs.readFileSync('data.json');
  const food = JSON.parse(data);
  return res.status(200).send(food.userOrder);
});
// get one order by ID
router.get('/orders/:id', (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync('data.json');
  const food = JSON.parse(data).userOrder;
  for (let i = 0; i < food.length; i += 1) {
    if (food[i].id === Number(id)) {
      return res.status(200).send(food[i]);
    }
  }
  return res.status(404).send({
    status: 'Food Not found',
  });
});
// post new orders to the admin page by users
router.post('/orders', (req, res) => {
  const newFood = req.body;
  if (Object.keys(newFood).length === 0) {
    return res.status(204).send({
      status: 'No content',
    });
  }
  if (!(newFood.price && newFood.food && newFood.quantity)) {
    return res.send({
      status: 'Incomplete content',
      message: 'Body must contain Price, Food and Quantity',
    });
  }
  // split the food and price if they are more than one
  const foodAdded = newFood.food.split(',');
  const quantity = newFood.quantity.split(',');
  let price = newFood.price.split(',');
  if (foodAdded.length > quantity.length) {
    return res.send({
      status: 'Incomplete content',
      message: '1 or more quantity(s) is missing',
    });
  } if (quantity.length > foodAdded.length) {
    return res.send({
      status: 'Incomplete content',
      message: '1 or more food is missing',
    });
  } if (quantity.length !== price.length) {
    return res.send({
      status: 'Incomplete content',
      message: 'price for each food must be added',
    });
  }
  // add all the quantity price together
  let addedPrice = 0;
  for (let i = 0; i < quantity.length; i += 1) {
    addedPrice += Number(price[i]) * Number(quantity[i]);
  }
  price = addedPrice;
  const data = fs.readFileSync('data.json');
  const food = JSON.parse(data);
  let id = 0;
  if (food.userOrder[food.userOrder.length - 1].id === undefined) {
    id = 1;
  } else {
    id = food.userOrder[food.userOrder.length - 1].id + 1;
  }
  const updatedFood = {
    id,
    food: foodAdded,
    quantity,
    price,
    status: 'Pending',
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
  const parameter = req.body;
  if (Object.keys(parameter).length === 0) {
    return res.status(204).send({
      status: 'No content',
    });
  }

  const { id } = req.params;
  const data = fs.readFileSync('data.json');
  const food = JSON.parse(data);
  for (let i = 0; i < food.userOrder.length; i += 1) {
    if (food.userOrder[i].id === Number(id)) {
      food.userOrder[i].status = parameter.status;
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
