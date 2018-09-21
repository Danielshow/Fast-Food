import { Router } from 'express';
import fs from 'fs';
import read from './read_file';
import body from '../js/shared';
import upload from '../js/multer_config';
// initialize router
const router = Router();


// get food list available on the webpage
router.get('/foodlist', (req, res) => {
  const food = read.readFromFile().foodList;
  return res.status(200).send(food);
});
// get foodlist by ID
router.get('/foodlist/:id', (req, res) => {
  const { id } = req.params;
  const food = read.readFromFile().foodList;
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
router.post('/foodlist', upload.single('foodImage'), (req, res) => {
  const imagePath = `${req.protocol}://${req.headers.host}/${req.file.path}`;
  const verify = body.verifyBody(req, res);
  if (!(verify === true)) {
    return;
  }
  const food = read.readFromFile();
  // Generate Unique ID
  const id = body.generateID(food.foodList);
  const newFoodlist = {
    id,
    food: req.body.food,
    price: req.body.price,
    imagePath,
  };
  food.foodList.push(newFoodlist);
  fs.writeFile('data.json', JSON.stringify(food, null, 2), (err) => {
    if (err) {
      return res.status(500).send({
        error: 'Error making request',
      });
    }
    return res.status(200).send({
      request: newFoodlist,
      message: 'Food Added Successfully',
    });
  });
});
// Admin can update food from foodList
router.put('/foodlist/:id', (req, res) => {
  const reqData = req.body;
  const verify = body.verifyBody();
  if (!(verify === true)) {
    return;
  }
  const { id } = req.params;
  const food = read.readFromFile();
  for (let i = 0; i < food.foodList.length; i += 1) {
    if (food.foodList[i].id === Number(id)) {
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
  const food = read.readFromFile();
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
  const newData = read.readFromFile();
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
