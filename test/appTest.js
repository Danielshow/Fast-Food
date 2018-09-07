const chai = require('chai');
const { expect } = require('chai');

chai.use(require('chai-http'));

const url = 'http://localhost:3000/api/v1';

// for post orders
const order = {
  id: 10,
  food: 'Fish and rice',
  price: 7044,
  status: 'pending',
};
// for put status
const orderStatus = {
  status: 'declined',
};
// for post food
const food = {
  id: 40,
  food: 'beans meat pomo',
  price: 340,
};

const updateFood = {
  food: 'beans meat pomo',
  price: 340,
};

describe('API endpoint GET /orders', () => {
  it('Should return all orders', () => chai.request(url)
    .get('/orders')
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('Array');
      expect(res.body[0]).to.be.an('object');
    }));

  it('Should return one order', () => chai.request(url)
    .get('/orders/7')
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
    }));

  it('Should return not found', () => chai.request(url)
    .get('/orders/100')
    .then((res) => {
      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status');
    }));

  it('Invalid Route should give 404', () => chai.request(url)
    .get('/anyroute')
    .then((res) => {
      expect(res).to.have.status(404);
    }));
});


describe('API endpoint POST /orders', () => {
  it('Should post orders', () => chai.request(url)
    .post('/orders')
    .send(order)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('success');
    }));

  it('Orders should not be empty', () => chai.request(url)
    .post('/orders')
    .send({})
    .then((res) => {
      expect(res).to.have.status(204);
      expect(res).to.have.property('status');
    }));
});
// put orders
describe('API endpoint PUT /orders/id', () => {
  it('Should update order status', () => chai.request(url)
    .put('/orders/7')
    .send(orderStatus)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('success');
    }));

  it('Orders status should not be empty', () => chai.request(url)
    .put('/orders/100')
    .send({})
    .then((res) => {
      expect(res).to.have.status(204);
      expect(res).to.have.property('status');
    }));
});

// get foodlist
describe('API endpoint GET /foodlist', () => {
  it('Should get all foodList', () => chai.request(url)
    .get('/foodlist')
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('Array');
      expect(res.body[0]).to.be.an('object');
    }));
});
// get totalprice
describe('API endpoint GET /totalprice', () => {
  it('Should total price of food ordered', () => chai.request(url)
    .get('/totalprice')
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('total');
    }));

  it('Should return one food in foodlist', () => chai.request(url)
    .get('/foodlist/40')
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
    }));

  it('Should return not found', () => chai.request(url)
    .get('/foodlist/100')
    .then((res) => {
      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status');
    }));
});

describe('API endpoint POST /foodlist', () => {
  it('Should post foodList', () => chai.request(url)
    .post('/foodlist')
    .send(food)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('success');
    }));

  it('foodList should not be empty', () => chai.request(url)
    .post('/foodlist')
    .send({})
    .then((res) => {
      expect(res).to.have.status(204);
      expect(res).to.have.property('status');
    }));
});

describe('API endpoint PUT /foodlist/id', () => {
  it('Should update foodlist', () => chai.request(url)
    .put('/foodlist/28')
    .send(updateFood)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('success');
    }));

  it('FoodList to be updated must not be empty', () => chai.request(url)
    .put('/orders/2')
    .send({})
    .then((res) => {
      expect(res).to.have.status(204);
      expect(res).to.have.property('status');
    }));
});

// delete frood from foodList
describe('API endpoint DELETE /foodlist/id', () => {
  it('Should delete one food from foodlist', () => chai.request(url)
    .delete('/foodlist/29')
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('success');
    }));
});
