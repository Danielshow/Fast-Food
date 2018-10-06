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
var token = process.env.TOKEN1;
var dantoken = process.env.TOKEN2;

// for post FoodList
var food = {
  food: 'rice',
  price: 3000
};

var updateFood = {
  food: 'meat',
  price: 5000
};

var wrongfood = {
  food: '    ',
  price: 67
};

var wrongfood2 = {
  food: 'sphagetti'
};

describe('API endpoint POST /menu', function () {
  it('Should post food to the food menu given food field is not empty', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/menu').set('Authorization', 'Bearer ' + token).send(food).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body.data).to.be.an('Object');
      res.body.data.should.have.property('food').eql('rice');
      res.body.data.should.have.property('price').eql(3000);
    });
  });

  it('Should return error given food field is empty', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/menu').set('Authorization', 'Bearer ' + token).send(wrongfood).then(function (res) {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('Object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('Request must contain food');
    });
  });

  it('Should return error given price field is empty', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/menu').set('Authorization', 'Bearer ' + token).send(wrongfood2).then(function (res) {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('Object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('Request must contain Price');
    });
  });

  it('Should return error if food already exist', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/menu').set('Authorization', 'Bearer ' + token).send(food).then(function (res) {
      expect(res).to.have.status(409);
      expect(res.body).to.be.an('Object');
      res.body.should.have.property('message').eql('Food Already in FoodList');
    });
  });
});

describe('API endpoint GET /menu', function () {
  it('Should return all foods in the foodlist', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/menu').set('Authorization', 'Bearer ' + dantoken).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.data).to.be.an('Array');
      expect(res.body.data[0]).to.be.an('object');
      expect(res.body.data[0]).to.have.property('id');
    });
  });

  it('Should return one food from the folldlist when accessed through the food ID', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/menu/1').set('Authorization', 'Bearer ' + dantoken).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.data).to.have.property('id');
    });
  });

  it('Should return not found when food ID is not in the database', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/menu/100').set('Authorization', 'Bearer ' + dantoken).then(function (res) {
      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Food not found');
    });
  });
});

describe('API endpoint to Delete food from foodlist', function () {
  it('Should delete food from foodlist with a specified ID and return food deleted', function () {
    return _chai2.default.request(_index2.default).delete('/api/v1/menu/1').set('Authorization', 'Bearer ' + token).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Food deleted');
    });
  });
});

describe('API endpoint PUT /menu', function () {
  it('Should update food given food field and price is not empty', function () {
    return _chai2.default.request(_index2.default).put('/api/v1/menu/1').set('Authorization', 'Bearer ' + token).send(updateFood).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body.data).to.be.an('Object');
      res.body.data.should.have.property('food').eql('meat');
      res.body.data.should.have.property('price').eql(5000);
      res.body.should.have.property('message').eql('Food Updated');
    });
  });

  it('Price must be a number', function () {
    return _chai2.default.request(_index2.default).put('/api/v1/menu/1').set('Authorization', 'Bearer ' + token).send({
      food: 'plantian chips',
      price: '600'
    }).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body.data.price).to.be.a('number');
    });
  });

  it('Should return error given food field is empty', function () {
    return _chai2.default.request(_index2.default).put('/api/v1/menu/1').set('Authorization', 'Bearer ' + token).send({
      price: 780
    }).then(function (res) {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('Object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('Request must contain food');
    });
  });

  it('Should return error given price field is empty', function () {
    return _chai2.default.request(_index2.default).put('/api/v1/menu/1').set('Authorization', 'Bearer ' + token).send({
      food: 'Dodo'
    }).then(function (res) {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('Object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('Request must contain Price');
    });
  });
});