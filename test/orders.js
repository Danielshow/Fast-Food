import chai from 'chai';
import chaiHttp from 'chai-http';
import url from '../index';

const { expect } = chai;
const should = chai.should();
chai.use(chaiHttp);

// for put status
const orderStatus = {
  status: 'processing',
};
// for post food
const postFood = {
  food: 'rice,beans',
  quantity: '1,4',
  price: '34,67',
};

describe('API endpoint POST /orders', () => {
  it('Should post food', () => chai.request(url)
    .post('/api/v1/orders')
    .send(postFood)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body.request).to.be.an('Object');
      res.body.request.should.have.property('food').eql('rice,beans'.split(','));
      res.body.request.should.have.property('status').eql('new');
    }));
});

describe('API endpoint GET /orders', () => {
  it('Should return all orders', () => chai.request(url)
    .get('/api/v1/orders')
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body.orders).to.be.an('Array');
      expect(res.body.orders[0]).to.have.property('id');
      res.body.orders[0].should.have.property('id').eql(1);
      res.body.orders[0].should.have.property('food').eql('rice,beans')
    }));

  it('Should return one order', () => chai.request(url)
    .get('/api/v1/orders/1')
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      res.body.order.should.have.property('id').eql(1);
      res.body.order.should.have.property('user_id').eql(2);
    }));

  it('Should return not found', () => chai.request(url)
    .get('/api/v1/orders/100')
    .then((res) => {
      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Food not found');
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
    .put('/api/v1/orders/1')
    .send(orderStatus)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Food Status Updated');
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
