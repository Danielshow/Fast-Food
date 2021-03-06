import body from '../middleware/shared';
import db from '../db/index';
import cloudinary from '../middleware/cloudinary';
/* eslint-disable class-methods-use-this */
class FoodListController {
  getAllFood(req, res, next) {
    db.query('SELECT * FROM foodlist', (err, data) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({
        TYPE: 'GET',
        status: 200,
        data: data.rows,
        message: 'Food Returned Successfully',
      });
    });
  }

  getFood(req, res, next) {
    const { id } = req.params;
    db.query('SELECT * FROM foodlist WHERE id=$1', [id], (err, data) => {
      if (err) {
        return next(err);
      }
      if (data.rows.length > 0) {
        return res.status(200).json({
          TYPE: 'GET',
          status: 200,
          data: data.rows[0],
          message: 'Food returned Successfully',
        });
      }
      return res.status(404).json({
        TYPE: 'GET',
        status: 404,
        message: 'Food not found',
      });
    });
  }

  postFood(req, res, next) {
    let image = null;
    if (!req.file) {
      image = req.imagepath;
    } else {
      image = req.file.path;
    }
    cloudinary.uploader.upload(image, (result) => {
      db.query('INSERT INTO foodlist(food, price, image) VALUES($1,$2,$3)', [req.body.food, req.body.price, result.secure_url], (err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json({
          TYPE: 'POST',
          status: 200,
          data: {
            food: req.body.food.trim(),
            price: Number(req.body.price),
            image: result.secure_url,
          },
          message: 'Food Added Successfully',
        });
      });
    });
  }

  updateFood(req, res, next) {
    const { id } = req.params;
    let image = null;
    if (!req.file) {
      image = req.imagepath;
    } else {
      image = req.file.path;
    }
    cloudinary.uploader.upload(image, (result) => {
      db.query('UPDATE foodlist SET food=$1,price=$2,image=$3 WHERE id=$4', [req.body.food, req.body.price, result.secure_url, id], (err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json({
          TYPE: 'PUT',
          status: 200,
          data: {
            food: req.body.food.trim(),
            price: Number(req.body.price),
            image: result.secure_url,
          },
          message: 'Food Updated',
        });
      });
    })
  }

  deleteFood(req, res, next) {
    const { id } = req.params;
    db.query('DELETE from foodlist WHERE id=$1', [id], (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({
        TYPE: 'DELETE',
        status: 200,
        message: 'Food deleted',
      });
    });
  }

  getTotal(req, res, next) {
    db.query('SELECT sum(price) from ORDERS', (err, data) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({
        TYPE: 'GET',
        status: 200,
        data: data.rows[0].sum,
        message: 'Success, Total Returned',
      });
    });
  }
}
const foodlistController = new FoodListController();
export default foodlistController;
