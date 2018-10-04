import chai from 'chai';
import chaiHttp from 'chai-http';
import url from '../index';

const { expect } = chai;
const should = chai.should();
chai.use(chaiHttp);
// token
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGZvb2RmYXN0LmNvbSIsInVzZXJpZCI6MSwiaWF0IjoxNTM4NTgxMTI0fQ.ANn_QoRyNFwUGnBJIZxE-rSVAgk_s5o36C-KPTgRbP0';
const dantoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbmllbHNob3RAZ21haWwuY29tIiwidXNlcmlkIjozLCJpYXQiOjE1Mzg1ODEzNDB9.OYdjYiAdriDqHCV4n2-9ngy696SaomTUDcJ8lgJjN88';

// for post FoodList
const food = {
  food: 'rice',
  price: 3000,
};

const updateFood = {
  food: 'meat',
  price: 5000,
};

describe('API endpoint POST /menu', () => {
  it('Should post food', () => chai.request(url)
    .post('/api/v1/menu')
    .set('Authorization', `Bearer ${token}`)
    .send(food)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body.request).to.be.an('Object');
      res.body.request.should.have.property('food').eql('rice');
      res.body.request.should.have.property('price').eql(3000);
    }));
});
describe('API endpoint GET /menu', () => {
  it('Should return all foods in foodlist', () => chai.request(url)
    .get('/api/v1/menu')
    .set('Authorization', `Bearer ${dantoken}`)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.food).to.be.an('Array');
      expect(res.body.food[0]).to.be.an('object');
      expect(res.body.food[0]).to.have.property('id');
    }));

  it('Should return one menu', () => chai.request(url)
    .get('/api/v1/menu/1')
    .set('Authorization', `Bearer ${dantoken}`)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.food).to.have.property('id');
    }));

  it('Should return not found', () => chai.request(url)
    .get('/api/v1/menu/100')
    .set('Authorization', `Bearer ${dantoken}`)
    .then((res) => {
      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Food not found');
    }));
});

describe('API endpoint to Delete food from foodlist', () => {
  it('Should delete food from foodlist with a specified ID', () => chai.request(url)
    .delete('/api/v1/menu/1')
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Food deleted');
    }));
});

describe('API endpoint POST /menu', () => {
  it('Should update food', () => chai.request(url)
    .put('/api/v1/menu/1')
    .set('Authorization', `Bearer ${token}`)
    .send(updateFood)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body.request).to.be.an('Object');
      res.body.request.should.have.property('food').eql('meat');
      res.body.request.should.have.property('price').eql(5000);
      res.body.should.have.property('message').eql('Food Updated');
    }));
});
