import fs from 'fs';

const readFromFile = (() => {
  const data = fs.readFileSync('data.json');
  const food = JSON.parse(data);
  return food;
});
// check if food is available, return true
const isFoodAvailable = ((req, res, next) => {
  const foods = readFromFile().foodList;
  for (let i = 0; i < foods.length; i += 1) {
    if (req.body.food.toLowerCase() === foods[i].food.toLowerCase()) {
      return res.status(409).json({
        message: 'Food Already in FoodList',
      });
    }
  }
  next();
});
export default {
  readFromFile,
  isFoodAvailable,
};
