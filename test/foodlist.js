import chai from 'chai';
import chaiHttp from 'chai-http';
import url from '../index';

const { expect } = chai;
const should = chai.should();
chai.use(chaiHttp);

// for post FoodList
const food = {
  food: 'rice',
  price: 3000,
};

describe('API endpoint POST /foodlist', () => {
  it('Should post food', () => chai.request(url)
    .post('/api/v1/foodlist')
    .send(food)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body.request).to.be.an('Object');
      res.body.request.should.have.property('food').eql('rice');
      res.body.request.should.have.property('price').eql(3000);
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
    }));

  it('Should return one order', () => chai.request(url)
    .get('/api/v1/foodlist/1')
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.food).to.have.property('id');
    }));

  it('Should return not found', () => chai.request(url)
    .get('/api/v1/foodlist/100')
    .then((res) => {
      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Food not found');
    }));
});

describe('API endpoint to Delete food from foodlist', () => {
  it('Should delete food from foodlist with a specified ID', () => chai.request(url)
    .delete('/api/v1/foodlist/1')
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Food deleted');
    }));
});
