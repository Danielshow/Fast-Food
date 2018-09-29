import fs from 'fs';

const readFromFile = (() => {
  const data = fs.readFileSync('data.json');
  const food = JSON.parse(data);
  return food;
});
// check if food is available, return true
const isFoodAvailable = ((food) => {
  const foods = readFromFile().foodList;
  for (let i = 0; i < foods.length; i += 1) {
    if (food.toLowerCase() === foods[i].food.toLowerCase()) {
      return true;
    }
  }
  return false;
});
export default {
  readFromFile,
  isFoodAvailable,
};
