import chai from 'chai';
import chaiHttp from 'chai-http';
import url from '../index';

const { expect } = chai;
const should = chai.should();
chai.use(chaiHttp);

// for post orders
const order = {
  food: 'Fish',
  quantity: '1',
  price: '70',
};
// for put status
const orderStatus = {
  status: 'declined',
};
// for post food
const food = {
  food: 'beans',
  price: 340,
};

const updateFood = {
  food: 'Plantain',
  price: 340,
};

describe('API endpoint GET /orders', () => {
  it('Should return all orders', () => chai.request(url)
    .get('/api/v1/orders')
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body.orders).to.be.an('Array');
      expect(res.body.orders[0]).to.have.property('id');
      res.body.orders[0].should.have.property('price').eql(20);
    }));

  it('Should return one order', () => chai.request(url)
    .get('/api/v1/orders/8')
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.order.food).to.be.an('Array');
      res.body.order.should.have.property('id').eql(8);
      res.body.order.should.have.property('user_id').eql(1);
    }));

  it('Should return not found', () => chai.request(url)
    .get('/api/v1/orders/100')
    .then((res) => {
      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Food Not found');
    }));

  it('Invalid Route should give 404', () => chai.request(url)
    .get('/api/v1/anyroute')
    .then((res) => {
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('error');
      res.body.should.have.property('error').eql('Not Found');
    }));
});
// put orders
describe('API endpoint PUT /orders/id', () => {
  it('Should update order status', () => chai.request(url)
    .put('/api/v1/orders/8')
    .send(orderStatus)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Status Updated');
      res.body.request.should.have.property('status').eql('declined');
    }));
});

describe('API endpoint GET /foodlist', () => {
  it('Should return all foods in foodlist', () => chai.request(url)
    .get('/api/v1/foodlist')
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.food).to.be.an('Array');
      expect(res.body.food[0]).to.be.an('object');
      expect(res.body.food[0]).to.have.property('id');
      res.body.food[0].should.have.property('food').eql('beans')
    }));

  it('Should return one order', () => chai.request(url)
    .get('/api/v1/foodlist/31')
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.food).to.have.property('id');
      res.body.food.should.have.property('imagePath').eql('http://localhost:3000/uploads\\2018-09-21T08-12-53.356Z1.PNG');
    }));

  it('Should return not found', () => chai.request(url)
    .get('/api/v1/foodlist/100')
    .then((res) => {
      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Food Not found');
    }));
});

describe('API endpoint to Delete food from foodlist', () => {
  it('Should delete food from foodlist with a specified ID', () => chai.request(url)
    .delete('/api/v1/foodlist/32')
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Food deleted');
    }));

  it('Should return error if food not found', () => chai.request(url)
    .delete('/api/v1/foodlist/3')
    .then((res) => {
      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Food Not Found');
    }));
});

describe('API endpoint to GET total price of food ordered', () => {
  it('Should return price of food ordered', () => chai.request(url)
    .get('/api/v1/total')
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Success, Total Returned');
    }));
});
