'use strict';

var chai = require('chai');

var _require = require('chai'),
    expect = _require.expect;

chai.use(require('chai-http'));

var url = 'http://localhost:3000/api/v1';

// for post orders
var order = {
  id: 10,
  food: 'Fish and rice',
  price: 7044,
  status: 'pending'
};
// for put status
var orderStatus = {
  status: 'declined'
};
// for post food
var food = {
  id: 40,
  food: 'beans meat pomo',
  price: 340
};

var updateFood = {
  food: 'beans meat pomo',
  price: 340
};

describe('API endpoint GET /orders', function () {
  it('Should return all orders', function () {
    return chai.request(url).get('/orders').then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('Array');
      expect(res.body[0]).to.be.an('object');
    });
  });

  it('Should return one order', function () {
    return chai.request(url).get('/orders/7').then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
    });
  });

  it('Should return not found', function () {
    return chai.request(url).get('/orders/100').then(function (res) {
      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status');
    });
  });

  it('Invalid Route should give 404', function () {
    return chai.request(url).get('/anyroute').then(function (res) {
      expect(res).to.have.status(404);
    });
  });
});

describe('API endpoint POST /orders', function () {
  it('Should post orders', function () {
    return chai.request(url).post('/orders').send(order).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('success');
    });
  });

  it('Orders should not be empty', function () {
    return chai.request(url).post('/orders').send({}).then(function (res) {
      expect(res).to.have.status(204);
      expect(res).to.have.property('status');
    });
  });
});
// put orders
describe('API endpoint PUT /orders/id', function () {
  it('Should update order status', function () {
    return chai.request(url).put('/orders/7').send(orderStatus).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('success');
    });
  });

  it('Orders status should not be empty', function () {
    return chai.request(url).put('/orders/100').send({}).then(function (res) {
      expect(res).to.have.status(204);
      expect(res).to.have.property('status');
    });
  });
});

// get foodlist
describe('API endpoint GET /foodlist', function () {
  it('Should get all foodList', function () {
    return chai.request(url).get('/foodlist').then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('Array');
      expect(res.body[0]).to.be.an('object');
    });
  });
});
// get totalprice
describe('API endpoint GET /totalprice', function () {
  it('Should total price of food ordered', function () {
    return chai.request(url).get('/totalprice').then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('total');
    });
  });

  it('Should return one food in foodlist', function () {
    return chai.request(url).get('/foodlist/40').then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
    });
  });

  it('Should return not found', function () {
    return chai.request(url).get('/foodlist/100').then(function (res) {
      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status');
    });
  });
});

describe('API endpoint POST /foodlist', function () {
  it('Should post foodList', function () {
    return chai.request(url).post('/foodlist').send(food).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('success');
    });
  });

  it('foodList should not be empty', function () {
    return chai.request(url).post('/foodlist').send({}).then(function (res) {
      expect(res).to.have.status(204);
      expect(res).to.have.property('status');
    });
  });
});

describe('API endpoint PUT /foodlist/id', function () {
  it('Should update foodlist', function () {
    return chai.request(url).put('/foodlist/28').send(updateFood).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('success');
    });
  });

  it('FoodList to be updated must not be empty', function () {
    return chai.request(url).put('/orders/2').send({}).then(function (res) {
      expect(res).to.have.status(204);
      expect(res).to.have.property('status');
    });
  });
});