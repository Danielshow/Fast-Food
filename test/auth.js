import chai from 'chai';
import chaiHttp from 'chai-http';
import url from '../index';

const { expect } = chai;
const should = chai.should();
chai.use(chaiHttp);

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGZvb2RmYXN0LmNvbSIsInVzZXJpZCI6MSwiaWF0IjoxNTM4NTgxMTI0fQ.ANn_QoRyNFwUGnBJIZxE-rSVAgk_s5o36C-KPTgRbP0';

const newUser = {
  email: 'danielshoit@gmail.com',
  name: 'opeyemi',
  password: 'daniel',
  address: 'Ikorodu',
};

const admin = {
  email: 'admin22@fastfood.com',
  name: 'opeyemi',
  password: 'daniel',
  address: 'Ikorodu',
};

const testUser = {
  name: 'daniel',
  password: 'tolu',
  address: 'Lagos',
};

const newUserLogin = {
  email: 'danielshoit@gmail.com',
  password: 'daniel',
};
// .set('Authorization', `Bearer ${token}`)
// sign up
describe('API endpoint for POST auth/signup', () => {
  it('Should register user', () => chai.request(url)
    .post('/api/v1/auth/signup')
    .send(newUser)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body.request).to.be.an('Object');
      res.body.request.should.have.property('name');
      res.body.request.should.have.property('email').eql('danielshoit@gmail.com');
      res.body.request.should.have.property('address').eql('Ikorodu');
      res.body.should.have.property('message').eql('Registered Successfully');
    }));

  it('Should Return error if email field is empty', () => chai.request(url)
    .post('/api/v1/auth/signup')
    .send(testUser)
    .then((res) => {
      expect(res).to.have.status(206);
      res.body.should.have.property('message').eql('Email must be included in the body');
    }));


  it('Should Return error if password field is empty', () => chai.request(url)
    .post('/api/v1/auth/signup')
    .send({
      email: 'daniels@gmail.com',
      address: 'Home address',
    })
    .then((res) => {
      expect(res).to.have.status(206);
      res.body.should.have.property('message').eql('password must be included in the body');
    }));


  it('Should Return error if email syntax is wrong', () => chai.request(url)
    .post('/api/v1/auth/signup')
    .send({
      email: 'danielsgmail.com',
      address: 'Home address',
      name: 'opeyemi',
      password: 'daniel',
    })
    .then((res) => {
      expect(res).to.have.status(400);
      res.body.should.have.property('message').eql('Email format is wrong');
    }));

  it('Should Return error if email exists', () => chai.request(url)
    .post('/api/v1/auth/signup')
    .send({
      email: 'admin@foodfast.com',
      address: 'Home address',
      name: 'opeyemi',
      password: 'daniel',
    })
    .then((res) => {
      expect(res).to.have.status(409);
      res.body.should.have.property('message').eql('Email already exist');
    }));
});

// signin
describe('API endpoint for POST auth/login', () => {
  it('Should Login user', () => chai.request(url)
    .post('/api/v1/auth/login')
    .send(newUserLogin)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('Object');
      res.body.should.have.property('message').eql('Login Successful');
      res.body.should.have.property('token');
    }));

  it('Should Return error if email is not included', () => chai.request(url)
    .post('/api/v1/auth/login')
    .send({
      password: 'daniel',
    })
    .then((res) => {
      expect(res).to.have.status(206);
      expect(res.body).to.be.an('Object');
      res.body.should.have.property('message').eql('Email must be included in the body');
    }));

  it('Should Return error if password is not included', () => chai.request(url)
    .post('/api/v1/auth/login')
    .send({
      email: 'daniel@yahoo.com',
    })
    .then((res) => {
      expect(res).to.have.status(206);
      expect(res.body).to.be.an('Object');
      res.body.should.have.property('message').eql('password must be included in the body');
    }));


  it('Should Return error if email does not exist', () => chai.request(url)
    .post('/api/v1/auth/login')
    .send({
      email: 'danielopeyemi@yahoo.com',
      password: 'daniele',
    })
    .then((res) => {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('Object');
      res.body.should.have.property('message').eql('Email does not exist');
    }));
});
// admin login

describe('API endpoint POST /auth/signup/admin', () => {
  it('Should create admin', () => chai.request(url)
    .post('/api/v1/auth/signup/admin')
    .set('Authorization', `Bearer ${token}`)
    .send(admin)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body.request).to.be.an('Object');
      res.body.request.should.have.property('name').equal('opeyemi');
      res.body.request.should.have.property('address').eql('Ikorodu');
      res.body.should.have.property('message').eql('Registered Successfully');
    }));

  it('Should send auth failed if token is not sent', () => chai.request(url)
    .post('/api/v1/auth/signup/admin')
    .send(admin)
    .then((res) => {
      expect(res).to.have.status(401);
      res.body.should.have.property('message').eql('Authentication fail');
    }));
});