import chai from 'chai';
import chaiHttp from 'chai-http';
import url from '../index';

const { expect } = chai;
const should = chai.should();
chai.use(chaiHttp);

const token = process.env.TOKEN1;

const newUser = {
  email: 'danielshoit@gmail.com',
  name: 'opeyemi',
  password: 'daniel',
  confirmpassword: 'daniel',
  address: 'Ikorodu',
};

const fakeUser = {
  email: 'daniels@gmail.com',
  name: 'opeyemi',
  password: 'daniel',
  confirmpassword: 'dan',
  address: 'Ikorodu',
};

const admin = {
  email: 'admin22@fastfood.com',
  name: 'opeyemi',
  password: 'daniel',
  confirmpassword: 'daniel',
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
  it('Should register user given a valid credentials, and a user supply their email, name, password and address', () => chai.request(url)
    .post('/api/v1/auth/signup')
    .send(newUser)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body.data).to.be.an('Object');
      res.body.data.should.have.property('name');
      res.body.data.should.have.property('email').eql('danielshoit@gmail.com');
      res.body.data.should.have.property('address').eql('Ikorodu');
      res.body.should.have.property('message').eql('Registered Successfully');
    }));

  it('Should Return error if email field is empty or email field has whitespace only', () => chai.request(url)
    .post('/api/v1/auth/signup')
    .send(testUser)
    .then((res) => {
      expect(res).to.have.status(206);
      res.body.should.have.property('message').eql('Email must be included in the body');
    }));


  it('Should Return error if password field is empty or password field has only whitespace', () => chai.request(url)
    .post('/api/v1/auth/signup')
    .send({
      email: 'daniels@gmail.com',
      address: 'Home address',
    })
    .then((res) => {
      expect(res).to.have.status(206);
      res.body.should.have.property('message').eql('password must be included in the body');
    }));


  it('Should Return error if email syntax is wrong, Email syntax should be dan@yahoo.com', () => chai.request(url)
    .post('/api/v1/auth/signup')
    .send({
      email: 'danielsgmail.com',
      address: 'Home address',
      name: 'opeyemi',
      password: 'daniel',
      confirmpassword: 'daniel',
    })
    .then((res) => {
      expect(res).to.have.status(400);
      res.body.should.have.property('message').eql('Email format is wrong');
    }));

  it('Should Return error if email exists in the database. Email must be unique', () => chai.request(url)
    .post('/api/v1/auth/signup')
    .send({
      email: 'admin@foodfast.com',
      address: 'Home address',
      name: 'opeyemi',
      password: 'daniel',
      confirmpassword: 'daniel',
    })
    .then((res) => {
      expect(res).to.have.status(409);
      res.body.should.have.property('message').eql('Email already exist');
    }));


  it('Should Return error if password is not equal to confirm password', () => chai.request(url)
    .post('/api/v1/auth/signup')
    .send(fakeUser)
    .then((res) => {
      expect(res).to.have.status(400);
      res.body.should.have.property('message').eql('password and confirmpassword not equal');
    }));

  it('Should Return error if password length is less than 6', () => chai.request(url)
    .post('/api/v1/auth/signup')
    .send({
      email: 'admin@foodfast.com',
      address: 'Home address',
      name: 'opeyemi',
      password: 'dani',
      confirmpassword: 'dani',
    })
    .then((res) => {
      expect(res).to.have.status(206);
      res.body.should.have.property('message').eql('password must be a minimum of 6 characters');
    }));

  it('Should Return error if password length is less than 6', () => chai.request(url)
    .post('/api/v1/auth/signup')
    .send({
      email: 'admin@foodfast.com',
      address: 'Home address',
      name: 'opeyemi',
      password: 'dani',
    })
    .then((res) => {
      expect(res).to.have.status(400);
      res.body.should.have.property('message').eql('body must contain password and confirmpassword');
    }));
});

// signin
describe('API endpoint for POST auth/login', () => {
  it('Should Login user given a valid credentials and user supply email and password', () => chai.request(url)
    .post('/api/v1/auth/login')
    .send(newUserLogin)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('Object');
      res.body.should.have.property('message').eql('Login Successful');
      res.body.should.have.property('data');
      res.body.data.should.have.property('token');
    }));

  it('Should Return error if email is not included or email contain only whitespace', () => chai.request(url)
    .post('/api/v1/auth/login')
    .send({
      password: 'daniel',
    })
    .then((res) => {
      expect(res).to.have.status(206);
      expect(res.body).to.be.an('Object');
      res.body.should.have.property('message').eql('Email must be included in the body');
    }));

  it('Should Return error if password is not included or password contain only whitespace', () => chai.request(url)
    .post('/api/v1/auth/login')
    .send({
      email: 'daniel@yahoo.com',
    })
    .then((res) => {
      expect(res).to.have.status(206);
      expect(res.body).to.be.an('Object');
      res.body.should.have.property('message').eql('password must be included in the body');
    }));


  it('Should Return error if email does not exist, User must register before Login', () => chai.request(url)
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


  it('Should Return error if password is wrong', () => chai.request(url)
    .post('/api/v1/auth/login')
    .send({
      email: 'danielshoit@gmail.com',
      password: 'dani jjele',
    })
    .then((res) => {
      expect(res).to.have.status(403);
      expect(res.body).to.be.an('Object');
      res.body.should.have.property('message').eql('Invalid Credentials');
    }));
});
// admin login

describe('API endpoint POST /auth/signup/admin', () => {
  it('Should create admin account with administrative priviledges given valid credentials', () => chai.request(url)
    .post('/api/v1/auth/signup/admin')
    .set('Authorization', `Bearer ${token}`)
    .send(admin)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body.data).to.be.an('Object');
      res.body.data.should.have.property('name').equal('opeyemi');
      res.body.data.should.have.property('address').eql('Ikorodu');
      res.body.should.have.property('message').eql('Registered Successfully');
    }));

  it('Should send auth failed if token is not sent. Token must be send with the header', () => chai.request(url)
    .post('/api/v1/auth/signup/admin')
    .send(admin)
    .then((res) => {
      expect(res).to.have.status(403);
      res.body.should.have.property('message').eql('Authentication fail, Please provide Token');
    }));


  it('Should send an error if an Invalid token is sent. Token must be send with the header', () => chai.request(url)
    .post('/api/v1/auth/signup/admin')
    .set('Authorization', 'Bearer jdjdj')
    .send(admin)
    .then((res) => {
      expect(res).to.have.status(401);
      res.body.should.have.property('message').eql('Authentication fail, Incorrect Token');
    }));
});
