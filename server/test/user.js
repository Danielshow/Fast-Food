import chai from 'chai';
import chaiHttp from 'chai-http';
import url from '../index';

const { expect } = chai;
const should = chai.should();
chai.use(chaiHttp);

const token = process.env.TOKEN1;
const usertoken = process.env.TOKEN2;

describe('API endpoint for GET all users /users', () => {
  it('Should return all users given an admin token is added', () => chai.request(url)
    .get('/api/v1/users')
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body.data).to.be.an('Array');
      res.body.should.have.property('type').eql('GET');
      res.body.should.have.property('message').eql('All users returned successfully');
    }));

  it('Should Return error if token is not added', () => chai.request(url)
    .get('/api/v1/users')
    .then((res) => {
      expect(res).to.have.status(403);
      res.body.should.have.property('message').eql('Authentication fail, Please provide Token');
    }));

  it('Should Return error if Incorrect token is added', () => chai.request(url)
    .get('/api/v1/users')
    .set('Authorization', 'Bearer dkdkdkdk')
    .then((res) => {
      expect(res).to.have.status(401);
      res.body.should.have.property('message').eql('Authentication fail, Incorrect Token');
    }));
});

describe('API endpoint to Update user roles using /users', () => {
  it('Should update a user to admin', () => chai.request(url)
    .put('/api/v1/users/1')
    .set('Authorization', `Bearer ${token}`)
    .send({
      roles: 'Admin',
    })
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('Object');
      res.body.should.have.property('type').eql('PUT');
      res.body.should.have.property('message').eql('User promoted to admin successfully');
    }));

  it('Should return error if roles field is only whitespace', () => chai.request(url)
    .put('/api/v1/users/2')
    .set('Authorization', `Bearer ${token}`)
    .send({
      roles: ' ',
    })
    .then((res) => {
      expect(res).to.have.status(400);
      res.body.should.have.property('message').eql('roles must be included in the body');
    }));

  it('Should return error if ID is not a number', () => chai.request(url)
    .put('/api/v1/users/dkddk')
    .set('Authorization', `Bearer ${token}`)
    .send({
      roles: ' ',
    })
    .then((res) => {
      expect(res).to.have.status(403);
      res.body.should.have.property('message').eql('ID must be a number and less than 9000');
    }));

  it('Should return error if roles is not admin or user', () => chai.request(url)
    .put('/api/v1/users/1')
    .set('Authorization', `Bearer ${token}`)
    .send({
      roles: 'dgddgh',
    })
    .then((res) => {
      expect(res).to.have.status(400);
      res.body.should.have.property('message').eql('Roles must be either Admin or Users');
    }));
});
