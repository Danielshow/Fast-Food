import chai from 'chai';
import chaiHttp from 'chai-http';
import url from '../index';

const { expect } = chai;
const should = chai.should();
chai.use(chaiHttp);
// token
const token = process.env.TOKEN1;
const dantoken = process.env.TOKEN2;

// for post FoodList
const food = {
  food: 'rice',
  price: 3000,
};

const updateFood = {
  food: 'meat',
  price: 5000,
};

const wrongfood = {
  food: '    ',
  price: 67,
};

const wrongfood2 = {
  food: 'sphagetti',
};

describe('API endpoint POST /menu', () => {
  it('Should post food to the food menu given food field is not empty', () => chai.request(url)
    .post('/api/v1/menu')
    .set('Authorization', `Bearer ${token}`)
    .send(food)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body.data).to.be.an('Object');
      res.body.data.should.have.property('food').eql('rice');
      res.body.data.should.have.property('price').eql(3000);
      res.body.data.should.have.property('image');
    }));

  it('Should return error given food field is empty', () => chai.request(url)
    .post('/api/v1/menu')
    .set('Authorization', `Bearer ${token}`)
    .send(wrongfood)
    .then((res) => {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('Object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('Request must contain food');
    }));

  it('Should return error given price field is empty', () => chai.request(url)
    .post('/api/v1/menu')
    .set('Authorization', `Bearer ${token}`)
    .send(wrongfood2)
    .then((res) => {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('Object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('Request must contain Price');
    }));

  it('Should return error if food already exist', () => chai.request(url)
    .post('/api/v1/menu')
    .set('Authorization', `Bearer ${token}`)
    .send(food)
    .then((res) => {
      expect(res).to.have.status(409);
      expect(res.body).to.be.an('Object');
      res.body.should.have.property('message').eql('Food Already in FoodList');
    }));
});


describe('API endpoint GET /menu', () => {
  it('Should return all foods in the foodlist', () => chai.request(url)
    .get('/api/v1/menu')
    .set('Authorization', `Bearer ${dantoken}`)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.data).to.be.an('Array');
      expect(res.body.data[0]).to.be.an('object');
      expect(res.body.data[0]).to.have.property('id');
    }));

  it('Should return one food from the folldlist when accessed through the food ID', () => chai.request(url)
    .get('/api/v1/menu/1')
    .set('Authorization', `Bearer ${dantoken}`)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.data).to.have.property('id');
    }));

  it('Should return not found when food ID is not in the database', () => chai.request(url)
    .get('/api/v1/menu/100')
    .set('Authorization', `Bearer ${dantoken}`)
    .then((res) => {
      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Food not found');
    }));
});

describe('API endpoint to Delete food from foodlist', () => {
  it('Should delete food from foodlist with a specified ID and return food deleted', () => chai.request(url)
    .delete('/api/v1/menu/1')
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      res.body.should.have.property('message').eql('Food deleted');
    }));
});

describe('API endpoint PUT /menu', () => {
  it('Should update food given food field and price is not empty', () => chai.request(url)
    .put('/api/v1/menu/1')
    .set('Authorization', `Bearer ${token}`)
    .send(updateFood)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body.data).to.be.an('Object');
      res.body.data.should.have.property('food').eql('meat');
      res.body.data.should.have.property('price').eql(5000);
      res.body.should.have.property('message').eql('Food Updated');
    }));

  it('Price must be a number', () => chai.request(url)
    .put('/api/v1/menu/1')
    .set('Authorization', `Bearer ${token}`)
    .send({
      food: 'plantian chips',
      price: '600',
    })
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body.data.price).to.be.a('number');
    }));

  it('Should return error given food field is empty', () => chai.request(url)
    .put('/api/v1/menu/1')
    .set('Authorization', `Bearer ${token}`)
    .send({
      price: 780,
    })
    .then((res) => {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('Object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('Request must contain food');
    }));

  it('Should return error given price field is empty', () => chai.request(url)
    .put('/api/v1/menu/1')
    .set('Authorization', `Bearer ${token}`)
    .send({
      food: 'Dodo',
    })
    .then((res) => {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('Object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('message').eql('Request must contain Price');
    }));
});
