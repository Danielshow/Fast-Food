'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;

var should = _chai2.default.should();
_chai2.default.use(_chaiHttp2.default);

// for put status
var orderStatus = {
  status: 'processing'
};
// for post food
var postFood = {
  food: 'rice',
  price: '340',
  quantity: '1'
};

describe('API endpoint POST /orders', function () {
  it('Should post food', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/orders').send(postFood).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body.request).to.be.an('Object');
      res.body.request.should.have.property('food');
      res.body.request.should.have.property('status').eql('new');
    });
  });
});

describe('API endpoint GET /orders', function () {
  it('Should return all orders', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/orders').then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body.orders).to.be.an('Array');
      expect(res.body.orders[0]).to.have.property('id');
      res.body.orders[0].should.have.property('id').eql(1);
      res.body.orders[0].should.have.property('food').eql('rice');
    });
  });

  it('Should return one order', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/orders/1').then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      res.body.order.should.have.property('id').eql(1);
      res.body.order.should.have.property('user_id').eql(2);
    });
  });

  it('Should return not found', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/orders/100').then(function (res) {
      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Food not found');
    });
  });

  it('Invalid Route should give 404', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/anyroute').then(function (res) {
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('error');
      res.body.should.have.property('error').eql('Not Found');
    });
  });
});
// put orders
describe('API endpoint PUT /orders/id', function () {
  it('Should update order status', function () {
    return _chai2.default.request(_index2.default).put('/api/v1/orders/1').send(orderStatus).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Food Status Updated');
    });
  });
});

describe('API endpoint to GET total price of food ordered', function () {
  it('Should return price of food ordered', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/total').then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Success, Total Returned');
    });
  });
});