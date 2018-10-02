import db from '../db/index';
// check if food is available, return true
const isFoodAvailable = ((req, res, next) => {
  db.query('SELECT food from foodlist', (err, data) => {
    if (err) {
      return next(err);
    }
    for (let i = 0; i < data.rows.length; i += 1) {
      if (req.body.food.toLowerCase() === data.rows[i].food.toLowerCase()) {
        return res.status(409).json({
          message: 'Food Already in FoodList',
        });
      }
    }
    next();
  });
});
export default {
  isFoodAvailable,
};
