'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _orders = require('./routes/orders');

var _orders2 = _interopRequireDefault(_orders);

var _menu = require('./routes/menu');

var _menu2 = _interopRequireDefault(_menu);

var _auth = require('./routes/auth');

var _auth2 = _interopRequireDefault(_auth);

var _users = require('./routes/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var app = (0, _express2.default)();
// bodyparser middleware
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.use('/uploads', _express2.default.static('uploads'));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
<<<<<<< HEAD
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH');
=======
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', 'PUT, POST, GET, DELETE');
>>>>>>> fab9d48bb52b19cfeeb8faf8ebe9b5bbb89cbd3f
    return res.status(200).json({});
  }
  next();
});

app.use(function (err, req, res, next) {
  res.status(500).json({
    message: err.message
  });
});
// use routes folder
app.use('/api/v1', _orders2.default);
app.use('/api/v1', _menu2.default);
app.use('/api/v1', _auth2.default);
app.use('/api/v1', _users2.default);

app.get('/', function (req, res) {
  res.status(200).send({
    product: 'Welcome to Food Fast API',
    message: '/api/v1 before every route'
  });
});
// custom 404 handler
app.use(function (req, res, next) {
  var error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// error handling
app.use(function (error, req, res, next) {
  res.status(error.status || 500);
  res.send({
    error: error.message
  });
});
app.listen(process.env.PORT, function () {
  console.log('Server Listen on port ' + process.env.PORT);
});

exports.default = app;