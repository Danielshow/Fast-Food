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

// for post orders
var order = {
  food: 'Fish',
  quantity: '1',
  price: '70'
};
// for put status
var orderStatus = {
  status: 'declined'
};
// for post food
var food = {
  food: 'beans',
  price: 340
};

var updateFood = {
  food: 'Plantain',
  price: 340
};

describe('API endpoint GET /orders', function () {
  it('Should return all orders', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/orders').then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body.orders).to.be.an('Array');
      expect(res.body.orders[0]).to.have.property('id');
      res.body.orders[0].should.have.property('price').eql(20);
    });
  });

  it('Should return one order', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/orders/8').then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.order.food).to.be.an('Array');
      res.body.order.should.have.property('id').eql(8);
      res.body.order.should.have.property('user_id').eql(1);
    });
  });

  it('Should return not found', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/orders/100').then(function (res) {
      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Food Not found');
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
    return _chai2.default.request(_index2.default).put('/api/v1/orders/8').send(orderStatus).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Status Updated');
      res.body.request.should.have.property('status').eql('declined');
    });
  });
});

describe('API endpoint GET /foodlist', function () {
  it('Should return all foods in foodlist', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/foodlist').then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.food).to.be.an('Array');
      expect(res.body.food[0]).to.be.an('object');
      expect(res.body.food[0]).to.have.property('id');
      res.body.food[0].should.have.property('food').eql('beans');
    });
  });

  it('Should return one order', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/foodlist/31').then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.food).to.have.property('id');
      res.body.food.should.have.property('imagePath').eql('http://localhost:3000/uploads\\2018-09-21T08-12-53.356Z1.PNG');
    });
  });

  it('Should return not found', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/foodlist/100').then(function (res) {
      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Food Not found');
    });
  });
});

describe('API endpoint to Delete food from foodlist', function () {
  it('Should delete food from foodlist with a specified ID', function () {
    return _chai2.default.request(_index2.default).delete('/api/v1/foodlist/32').then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Food deleted');
    });
  });

  it('Should return error if food not found', function () {
    return _chai2.default.request(_index2.default).delete('/api/v1/foodlist/3').then(function (res) {
      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Food Not Found');
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