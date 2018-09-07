import { Router } from 'express';
import fs from 'fs';

// initialize router
const router = Router();

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
  const data = fs.readFileSync('data.json');
  const food = JSON.parse(data);
  food.userOrder.push(newFood);
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
// Edit order Status declined, completed, pending by admin
router.put('/orders/:id', (req, res) => {
  const parameter = req.body;
  const { id } = req.params;
  const data = fs.readFileSync('data.json');
  const food = JSON.parse(data);
  for (let i = 0; i < food.userOrder.length; i += 1) {
    if (food.userOrder[i].id === Number(id)) {
      food.userOrder[i].status = parameter.status;
      fs.writeFile('data.json', JSON.stringify(food, null, 2), (err) => {
        if (err) {
          res.send({
            error: 'Error updating food',
          });
        } else {
          res.status(200).send({
            request: food.userOrder[i],
            success: 'Status Updated',
          });
        }
      });
    }
  }
});

export default router;
