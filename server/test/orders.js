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

const token = process.env.TOKEN1;
const dantoken = process.env.TOKEN2;
// for post food
const postFood = {
  food: 'rice',
  price: '340',
  quantity: '1',
};

// .set('Authorization', `Bearer ${token}`)

describe('API endpoint POST /orders', () => {
  it('Should post orders given the user is logged in and token is sent through the headers', () => chai.request(url)
    .post('/api/v1/orders')
    .set('Authorization', `Bearer ${dantoken}`)
    .send(postFood)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body.request).to.be.an('Object');
      res.body.request.should.have.property('food');
      res.body.request.should.have.property('status').eql('new');
    }));
});

describe('API endpoint GET /orders', () => {
  it('Should return all orders given an admin is logged in with valid credentials and token is sent through the headers', () => chai.request(url)
    .get('/api/v1/orders')
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body.orders).to.be.an('Array');
      expect(res.body.orders[0]).to.have.property('id');
      res.body.orders[0].should.have.property('id').eql(1);
      res.body.orders[0].should.have.property('food').eql('rice');
    }));

  it('Should return one order given an admin with valid credentials', () => chai.request(url)
    .get('/api/v1/orders/1')
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      res.body.order.should.have.property('id').eql(1);
    }));

  it('Should return not found when food ID is not in the database', () => chai.request(url)
    .get('/api/v1/orders/100')
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Food not found');
    }));

  it('ID must be a number and less than 9000', () => chai.request(url)
    .get('/api/v1/orders/1009999')
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      expect(res).to.have.status(403);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('ID must be a number and less than 9000');
    }));

  it('ID must be a not be a Letter', () => chai.request(url)
    .get('/api/v1/orders/hjj')
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      expect(res).to.have.status(403);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('ID must be a number and less than 9000');
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
  it('Should update order status when status is not empty and a valid status is given', () => chai.request(url)
    .put('/api/v1/orders/1')
    .set('Authorization', `Bearer ${token}`)
    .send(orderStatus)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Food Status Updated');
    }));
});

describe('API endpoint to GET total price of food ordered', () => {
  it('Should return price of food all food ordered when an admin with valid credentials make request', () => chai.request(url)
    .get('/api/v1/total')
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Success, Total Returned');
    }));
});

describe('API endpoint to GET a particular order', () => {
  it('Should return order specific to a particular user with valid credentials', () => chai.request(url)
    .get('/api/v1/users/3/orders')
    .set('Authorization', `Bearer ${dantoken}`)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
    }));


  it('Should return error when a user with valid credentials try to access another person resource', () => chai.request(url)
    .get('/api/v1/users/2/orders')
    .set('Authorization', `Bearer ${dantoken}`)
    .then((res) => {
      expect(res).to.have.status(403);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Auth Fail, You are not authorize to view this resource');
    }));
});
