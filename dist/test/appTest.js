'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;

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
      expect(res.body).to.be.an('Array');
      expect(res.body[0]).to.be.an('object');
    });
  });

  it('Should return one order', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/orders/8').then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
    });
  });

  it('Should return not found', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/orders/100').then(function (res) {
      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status');
    });
  });

  it('Invalid Route should give 404', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/anyroute').then(function (res) {
      expect(res).to.have.status(404);
    });
  });
});

describe('API endpoint POST /orders', function () {
  it('Should post orders', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/orders').send(order).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('success');
    });
  });

  it('Orders should not be empty', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/orders').send({}).then(function (res) {
      expect(res).to.have.status(204);
      expect(res).to.have.property('status');
    });
  });
});
// put orders
describe('API endpoint PUT /orders/id', function () {
  it('Should update order status', function () {
    return _chai2.default.request(_index2.default).put('/api/v1/orders/8').send(orderStatus).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('success');
    });
  });

  it('Orders status should not be empty', function () {
    return _chai2.default.request(_index2.default).put('/api/v1/orders/100').send({}).then(function (res) {
      expect(res).to.have.status(204);
      expect(res).to.have.property('status');
    });
  });
});

// get foodlist
describe('API endpoint GET /foodlist', function () {
  it('Should get all foodList', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/foodlist').then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('Array');
      expect(res.body[0]).to.be.an('object');
    });
  });
});
// get totalprice
describe('API endpoint GET /totalprice', function () {
  it('Should total price of food ordered', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/totalprice').then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('total');
    });
  });
});

describe('API endpoint POST /foodlist', function () {
  it('Should post foodList', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/foodlist').send(food).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('success');
    });
  });

  it('foodList should not be empty', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/foodlist').send({}).then(function (res) {
      expect(res).to.have.status(204);
      expect(res).to.have.property('status');
    });
  });
});

describe('API endpoint PUT /foodlist/id', function () {
  it('Should update foodlist', function () {
    return _chai2.default.request(_index2.default).put('/api/v1/foodlist/28').send(updateFood).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('success');
    });
  });

  it('FoodList to be updated must not be empty', function () {
    return _chai2.default.request(_index2.default).put('/api/v1/orders/2').send({}).then(function (res) {
      expect(res).to.have.status(204);
      expect(res).to.have.property('status');
    });
  });
});

// delete frood from foodList
describe('API endpoint DELETE /foodlist/id', function () {
  it('Should delete one food from foodlist', function () {
    return _chai2.default.request(_index2.default).delete('/api/v1/foodlist/29').then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('success');
    });
  });
});