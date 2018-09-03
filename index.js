const express = require('express');

const port = process.env.port || 3000;
const app = express();

// use routes folder
app.use('/api/v1', require('./routes/api'));

const me = {
  me: 'yes',
  dan: 'im',
};

app.get('/', (req, res) => {
  res.send(me);
});

app.listen(port, () => {
  console.log(`Server Listen on port ${port}`);
});
