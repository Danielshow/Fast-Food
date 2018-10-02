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

var _foodlist = require('./routes/foodlist');

var _foodlist2 = _interopRequireDefault(_foodlist);

var _auth = require('./routes/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var app = (0, _express2.default)();
// bodyparser middleware
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.use('/uploads', _express2.default.static('uploads'));
// use routes folder
app.use('/api/v1', _orders2.default);
app.use('/api/v1', _foodlist2.default);
app.use('/api/v1', _auth2.default);

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