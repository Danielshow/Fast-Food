import db from '../db/index';
/* eslint-disable class-methods-use-this */
class OrderController {
  getAllOrder(req, res) {
    db.query('SELECT * FROM orders', (err, data) => {
      if (err) {
        res.status(500).json({
          message: err.message,
        });
      }
      return res.status(200).json({
        orders: data.rows,
        message: 'Orders returned successfully',
      });
    });
  }

  getOrder(req, res) {
    const { id } = req.params;
    db.query('SELECT * FROM orders WHERE id=$1', [id], (err, data) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }
      if (data.rows.length > 0) {
        return res.status(200).json({
          order: data.rows[0],
          message: 'One order returned Successfully',
        });
      }
      return res.status(404).json({
        message: 'Food not found',
      });
    });
  }

  getUserOrder(req, res) {
    const { id } = req.params;
    db.query('SELECT * FROM orders WHERE user_id=$1', [id], (err, data) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }
      if (data.rows.length > 0) {
        return res.status(200).json({
          food: data.rows,
          message: 'food returned Successfully',
        });
      }
      return res.status(404).json({
        message: 'Food by user not found',
      });
    });
  }

  postOrder(req, res) {
    const quantity = req.body.quantity.split(',');
    const food = req.body.food.split(',');
    let price = req.body.price.split(',');
    // set to token
    const userId = 2;
    // multiply quantity by their price to get total price
    let addedPrice = 0;
    for (let i = 0; i < quantity.length; i += 1) {
      addedPrice += Number(price[i]) * Number(quantity[i]);
    }
    price = addedPrice;
    db.query('INSERT INTO orders(food,quantity,price,user_id,status) VALUES($1,$2,$3,$4,$5)', [req.body.food, req.body.quantity, price, userId, 'new'], (err) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }
      return res.status(200).json({
        request: {
          food,
          quantity,
          price,
          status: 'new',
          userId,
        },
        message: 'Food Added to order list Successfully',
      });
    });
  }

  updateOrderStatus(req, res) {
    if (!req.body.status) {
      res.json({
        message: 'Status Not sent',
      });
    }
    const { status } = req.body;
    const { id } = req.params;
    db.query('UPDATE orders SET status=$1 WHERE id=$2', [status, id], (err) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }
      return res.json({
        message: 'Food Status Updated',
      });
    });
  }
}

const orderController = new OrderController();
export default orderController;
