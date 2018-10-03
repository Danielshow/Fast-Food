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

var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGZvb2RmYXN0LmNvbSIsInVzZXJpZCI6MSwiaWF0IjoxNTM4NTgxMTI0fQ.ANn_QoRyNFwUGnBJIZxE-rSVAgk_s5o36C-KPTgRbP0';
var dantoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbmllbHNob3RAZ21haWwuY29tIiwidXNlcmlkIjozLCJpYXQiOjE1Mzg1ODEzNDB9.OYdjYiAdriDqHCV4n2-9ngy696SaomTUDcJ8lgJjN88";
// for post food
var postFood = {
  food: 'rice',
  price: '340',
  quantity: '1'
};

var admin = {
  email: 'admin@fastfood.com',
  password: 'admin'
};

var newUser = {
  email: 'danielshot@gmail.com',
  name: 'opeyemi',
  password: 'daniel',
  address: 'Ikorodu'
};

var testUser = {
  name: 'daniel',
  password: 'tolu',
  address: 'Lagos'
};

var newUserLogin = {
  email: 'danielshot@gmail.com',
  password: 'daniel'
};
// .set('Authorization', `Bearer ${token}`)
// sign up
describe('API endpoint for POST auth/signup', function () {
  it('Should register user', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send(newUser).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body.request).to.be.an('Object');
      res.body.request.should.have.property('name');
      res.body.request.should.have.property('email').eql('danielshot@gmail.com');
      res.body.request.should.have.property('address').eql('Ikorodu');
      res.body.should.have.property('message').eql('Registered Successfully');
    });
  });

  it('Should Return error if email field is empty', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send(testUser).then(function (res) {
      expect(res).to.have.status(206);
      res.body.should.have.property('message').eql('Email must be included in the body');
    });
  });
});

// signin
describe('API endpoint for POST auth/login', function () {
  it('Should Login user', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/auth/login').send(newUserLogin).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('Object');
      res.body.should.have.property('message').eql('Login Successful');
      res.body.should.have.property('token');
    });
  });
});

describe('API endpoint POST /orders', function () {
  it('Should post food', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/orders').set('Authorization', 'Bearer ' + dantoken).send(postFood).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body.request).to.be.an('Object');
      res.body.request.should.have.property('food');
      res.body.request.should.have.property('status').eql('new');
    });
  });
});

describe('API endpoint GET /orders', function () {
  it('Should return all orders', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/orders').set('Authorization', 'Bearer ' + token).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body.orders).to.be.an('Array');
      expect(res.body.orders[0]).to.have.property('id');
      res.body.orders[0].should.have.property('id').eql(1);
      res.body.orders[0].should.have.property('food').eql('rice');
    });
  });

  it('Should return one order', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/orders/1').set('Authorization', 'Bearer ' + token).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      res.body.order.should.have.property('id').eql(1);
      res.body.order.should.have.property('user_id').eql(2);
    });
  });

  it('Should return not found', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/orders/100').set('Authorization', 'Bearer ' + token).then(function (res) {
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
    return _chai2.default.request(_index2.default).put('/api/v1/orders/1').set('Authorization', 'Bearer ' + token).send(orderStatus).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Food Status Updated');
    });
  });
});

describe('API endpoint to GET total price of food ordered', function () {
  it('Should return price of food ordered', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/total').set('Authorization', 'Bearer ' + token).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Success, Total Returned');
    });
  });
});