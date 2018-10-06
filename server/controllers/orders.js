import db from '../db/index';
/* eslint-disable class-methods-use-this */
class OrderController {
  getAllOrder(req, res, next) {
    db.query('SELECT * FROM orders', (err, data) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({
        TYPE: 'GET',
        status: 200,
        data: data.rows,
        message: 'Orders returned successfully',
      });
    });
  }

  getOrder(req, res, next) {
    const { id } = req.params;
    db.query('SELECT * FROM orders WHERE id=$1', [id], (err, data) => {
      if (err) {
        return next(err);
      }
      if (data.rows.length > 0) {
        return res.status(200).json({
          TYPE: 'GET',
          status: 200,
          data: data.rows[0],
          message: 'Order returned Successfully',
        });
      }
      return res.status(404).json({
        TYPE: 'GET',
        status: 404,
        message: 'Food not found',
      });
    });
  }

  getUserOrder(req, res, next) {
    const { id } = req.params;
    db.query('SELECT * FROM orders WHERE user_id=$1', [id], (err, data) => {
      if (err) {
        return next(err);
      }
      if (data.rows.length > 0) {
        return res.status(200).json({
          TYPE: 'GET',
          status: 200,
          data: data.rows,
          message: 'food returned Successfully',
        });
      }
      return res.status(404).json({
        TYPE: 'GET',
        status: 404,
        message: 'Food by user not found',
      });
    });
  }

  postOrder(req, res, next) {
    const quantity = req.body.quantity.split(',');
    const food = req.body.food.split(',');
    let price = req.body.price.split(',');
    const userId = req.decoded.userid;
    let addedPrice = 0;
    for (let i = 0; i < quantity.length; i += 1) {
      addedPrice += Number(price[i].trim()) * Number(quantity[i].trim());
    }
    price = addedPrice;
    const quantityList = [];
    const foodlist = [];
    for (let j = 0; j < food.length; j += 1) {
      quantityList.push(food[j].trim());
      foodlist.push(quantity[j].trim());
    }
    db.query('INSERT INTO orders(food,quantity,price,user_id,status) VALUES($1,$2,$3,$4,$5)', [foodlist.join(','), quantityList.join(','), price, userId, 'new'], (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({
        TYPE: 'POST',
        status: 200,
        data: {
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

  updateOrderStatus(req, res, next) {
    if (!req.body.status || req.body.status.trim().length < 1) {
      res.status(206).json({
        TYPE: 'PUT',
        status: 206,
        message: 'Status Not sent',
      });
    }
    const { status } = req.body;
    const { id } = req.params;
    db.query('UPDATE orders SET status=$1 WHERE id=$2', [status.toLowerCase(), id], (err) => {
      if (err) {
        return res.status(400).send({
          TYPE: 'PUT',
          status: 400,
          message: 'status should be either New,Processing,Cancelled or Complete.',
        });
      }
      return res.status(200).json({
        TYPE: 'PUT',
        status: 200,
        message: 'Food Status Updated',
      });
    });
  }
}

const orderController = new OrderController();
export default orderController;
