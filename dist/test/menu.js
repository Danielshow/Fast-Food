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

// for post FoodList
var food = {
  food: 'rice',
  price: 3000
};

describe('API endpoint POST /foodlist', function () {
  it('Should post food', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/menu').send(food).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body.request).to.be.an('Object');
      res.body.request.should.have.property('food').eql('rice');
      res.body.request.should.have.property('price').eql(3000);
    });
  });
});
describe('API endpoint GET /foodlist', function () {
  it('Should return all foods in foodlist', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/menu').then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.food).to.be.an('Array');
      expect(res.body.food[0]).to.be.an('object');
      expect(res.body.food[0]).to.have.property('id');
    });
  });

  it('Should return one order', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/menu/1').then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.food).to.have.property('id');
    });
  });

  it('Should return not found', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/menu/100').then(function (res) {
      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Food not found');
    });
  });
});

describe('API endpoint to Delete food from foodlist', function () {
  it('Should delete food from foodlist with a specified ID', function () {
    return _chai2.default.request(_index2.default).delete('/api/v1/menu/1').then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Food deleted');
    });
  });
});