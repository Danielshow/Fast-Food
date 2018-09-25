import fs from 'fs';

function readFromFile() {
  const data = fs.readFileSync('data.json');
  const food = JSON.parse(data);
  return food;
}

export default {
  readFromFile,
};
