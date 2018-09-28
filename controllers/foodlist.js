import fs from 'fs';
import read from '../js/read_file';
import body from '../js/shared';
/* eslint-disable class-methods-use-this */
class FoodListController {
  getAllFoods(req, res) {
    const food = read.readFromFile().foodList;
    return res.status(200).json(food);
  }

  getFood(req, res) {
    const { id } = req.params;
    const food = read.readFromFile().foodList;
    for (let i = 0; i < food.length; i += 1) {
      if (food[i].id === Number(id)) {
        return res.status(200).json(food[i]);
      }
    }
    return res.status(404).json({
      status: 'Food Not found',
    });
  }

  postFood(req, res) {
    const imagePath = `${req.protocol}://${req.headers.host}/${req.file.path}`;
    const verify = body.verifyBody(req, res);
    if (!(verify)) {
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
        return res.status(500).json({
          error: 'Error making request',
        });
      }
      return res.json({
        request: newFoodlist,
        message: 'Food Added Successfully',
      });
    });
  }

  updateFood(req, res) {
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
            return res.json({
              error: 'Error updating food',
            });
          }
          return res.status(200).json({
            request: food.foodList[i],
            success: 'Food Updated',
          });
        });
      }
    }
  }

  deleteFood(req, res) {
    const { id } = req.params;
    const food = read.readFromFile();

    const foodList = food.foodList.filter(x => x.id !== Number(id));
    if (foodList.length === food.foodList.length) {
      return res.status(404).json({
        error: 'Food Not Found',
      });
    }
    food.foodList = foodList;
    fs.writeFile('data.json', JSON.stringify(food, null, 2), (err) => {
      if (err) {
        return res.status(500).json({
          error: 'error deleting food',
        });
      }
      return res.status(200).json({
        success: 'Food deleted',
      });
    });
  }

  getTotal(req, res) {
    const newData = read.readFromFile();
    let total = 0;
    for (let i = 0; i < newData.userOrder.length; i += 1) {
      total += newData.userOrder[i].price;
    }
    return res.status(200).json({
      total,
      status: 'Success',
    });
  }
}
const foodlistController = new FoodListController();
export default foodlistController;
