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

var token = process.env.TOKEN1;
var dantoken = process.env.TOKEN2;
// for post food
var postFood = {
  food: 'rice',
  price: '340',
  quantity: '1'
};

// .set('Authorization', `Bearer ${token}`)

describe('API endpoint POST /orders', function () {
  it('Should post orders given the user is logged in and token is sent through the headers', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/orders').set('Authorization', 'Bearer ' + dantoken).send(postFood).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body.request).to.be.an('Object');
      res.body.request.should.have.property('food');
      res.body.request.should.have.property('status').eql('new');
    });
  });

  it('Should send an error if an Invalid token is sent. Token must be send with the header', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/orders').set('Authorization', 'Bearer jdjdj').send(postFood).then(function (res) {
      expect(res).to.have.status(401);
      res.body.should.have.property('message').eql('Authentication fail, Incorrect Token');
    });
  });
});

describe('API endpoint GET /orders', function () {
  it('Should return all orders given an admin is logged in with valid credentials and token is sent through the headers', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/orders').set('Authorization', 'Bearer ' + token).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body.orders).to.be.an('Array');
      expect(res.body.orders[0]).to.have.property('id');
      res.body.orders[0].should.have.property('id').eql(1);
    });
  });

  it('Should return one order given an admin with valid credentials', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/orders/1').set('Authorization', 'Bearer ' + token).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      res.body.order.should.have.property('id').eql(1);
    });
  });

  it('Should return not found when food ID is not in the database', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/orders/100').set('Authorization', 'Bearer ' + token).then(function (res) {
      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Food not found');
    });
  });

  it('ID must be a number and less than 9000', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/orders/1009999').set('Authorization', 'Bearer ' + token).then(function (res) {
      expect(res).to.have.status(403);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('ID must be a number and less than 9000');
    });
  });

  it('ID must be a not be a Letter', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/orders/hjj').set('Authorization', 'Bearer ' + token).then(function (res) {
      expect(res).to.have.status(403);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('ID must be a number and less than 9000');
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
  it('Should update order status when status is not empty and a valid status is given', function () {
    return _chai2.default.request(_index2.default).put('/api/v1/orders/1').set('Authorization', 'Bearer ' + token).send(orderStatus).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Food Status Updated');
    });
  });
});

describe('API endpoint to GET total price of food ordered', function () {
  it('Should return price of food all food ordered when an admin with valid credentials make request', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/total').set('Authorization', 'Bearer ' + token).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Success, Total Returned');
    });
  });
});

describe('API endpoint to GET a particular order', function () {
  it('Should return order specific to a particular user with valid credentials', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/users/3/orders').set('Authorization', 'Bearer ' + dantoken).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
    });
  });

  it('Should return error when a user with valid credentials try to access another person resource', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/users/2/orders').set('Authorization', 'Bearer ' + dantoken).then(function (res) {
      expect(res).to.have.status(403);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Auth Fail, You are not authorize to view this resource');
    });
  });

  it('Should return error when a user pass in wrong token', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/users/2/orders').set('Authorization', 'Bearer jjlllk').then(function (res) {
      expect(res).to.have.status(401);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Authentication fail, Incorrect Token');
    });
  });

  it('Should return error when no token is passed for a protected field', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/users/2/orders').then(function (res) {
      expect(res).to.have.status(403);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Authentication fail, Please provide Token');
    });
  });
});