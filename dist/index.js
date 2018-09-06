'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _api = require('./routes/api');

var _api2 = _interopRequireDefault(_api);

var _user = require('./routes/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.port || 3000;
var app = (0, _express2.default)();

// bodyparser middleware
app.use(_bodyParser2.default.json());
// use routes folder
app.use('/api/v1', _api2.default);
app.use('/api/v1', _user2.default);

app.listen(port, function () {
  console.log('Server Listen on port ' + port);
});