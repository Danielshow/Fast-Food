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
// token
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGZvb2RmYXN0LmNvbSIsInVzZXJpZCI6MSwiaWF0IjoxNTM4NTgxMTI0fQ.ANn_QoRyNFwUGnBJIZxE-rSVAgk_s5o36C-KPTgRbP0';
var dantoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbmllbHNob3RAZ21haWwuY29tIiwidXNlcmlkIjozLCJpYXQiOjE1Mzg1ODEzNDB9.OYdjYiAdriDqHCV4n2-9ngy696SaomTUDcJ8lgJjN88';

// for post FoodList
var food = {
  food: 'rice',
  price: 3000
};

var updateFood = {
  food: 'meat',
  price: 5000
};

describe('API endpoint POST /menu', function () {
  it('Should post food', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/menu').set('Authorization', 'Bearer ' + token).send(food).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body.request).to.be.an('Object');
      res.body.request.should.have.property('food').eql('rice');
      res.body.request.should.have.property('price').eql(3000);
    });
  });
});
describe('API endpoint GET /menu', function () {
  it('Should return all foods in foodlist', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/menu').set('Authorization', 'Bearer ' + dantoken).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.food).to.be.an('Array');
      expect(res.body.food[0]).to.be.an('object');
      expect(res.body.food[0]).to.have.property('id');
    });
  });

  it('Should return one menu', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/menu/1').set('Authorization', 'Bearer ' + dantoken).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.food).to.have.property('id');
    });
  });

  it('Should return not found', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/menu/100').set('Authorization', 'Bearer ' + dantoken).then(function (res) {
      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Food not found');
    });
  });
});

describe('API endpoint to Delete food from foodlist', function () {
  it('Should delete food from foodlist with a specified ID', function () {
    return _chai2.default.request(_index2.default).delete('/api/v1/menu/1').set('Authorization', 'Bearer ' + token).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Food deleted');
    });
  });
});

describe('API endpoint POST /menu', function () {
  it('Should update food', function () {
    return _chai2.default.request(_index2.default).put('/api/v1/menu/1').set('Authorization', 'Bearer ' + token).send(updateFood).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body.request).to.be.an('Object');
      res.body.request.should.have.property('food').eql('meat');
      res.body.request.should.have.property('price').eql(5000);
      res.body.should.have.property('message').eql('Food Updated');
    });
  });
});