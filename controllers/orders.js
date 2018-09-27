import fs from 'fs';
import read from '../js/read_file';
import body from '../js/shared';
/* eslint-disable class-methods-use-this */
class OrderController {
  getAllOrders(req, res) {
    const food = read.readFromFile();
    return res.status(200).send(food.userOrder);
  }

  getOrder(req, res) {
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
  }

  getUserOrder(req, res) {
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
  }

  postOrder(req, res) {
    const newFood = req.body;
    body.verifyBodyandQuantity(req, res);
    // split the food and price if they are more than one
    const foodAdded = newFood.food.split(',');
    const quantity = newFood.quantity.split(',');
    let price = newFood.price.split(',');
    // check if food and quantity are of same length
    const verify = body.verifyLenghtOfVariables(foodAdded, quantity, price, res);
    if (!(verify)) {
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
  }

  updateOrderStatus(req, res) {
    // status must be passed with the body
    if (!req.body.status) {
      res.send({
        error: 'Status Not sent',
      });
    }
    const { status } = req.body;
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
    return res.send({
      message: 'Food not found',
    });
  }
}

const orderController = new OrderController();
export default orderController;
