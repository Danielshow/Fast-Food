'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;

var should = _chai2.default.should();
_chai2.default.use(_chaiHttp2.default);

var token = process.env.TOKEN1;
var token2 = process.env.TOKEN2;

var newUser = {
  email: 'danielshoit@gmail.com',
  name: 'opeyemi',
  password: 'daniel',
  confirmpassword: 'daniel',
  address: 'Ikorodu'
};

var fakeUser = {
  email: 'daniels@gmail.com',
  name: 'opeyemi',
  password: 'daniel',
  confirmpassword: 'dan',
  address: 'Ikorodu'
};

var admin = {
  email: 'admin22@fastfood.com',
  name: 'opeyemi',
  password: 'daniel',
  confirmpassword: 'daniel',
  address: 'Ikorodu'
};

var testUser = {
  name: 'daniel',
  password: 'tolu',
  address: 'Lagos'
};

var newUserLogin = {
  email: 'danielshoit@gmail.com',
  password: 'daniel'
};
// .set('Authorization', `Bearer ${token}`)
// sign up
describe('API endpoint for POST auth/signup', function () {
  it('Should register user given a valid credentials, and a user supply their email, name, password and address', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send(newUser).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body.data).to.be.an('Object');
      res.body.data.should.have.property('name');
      res.body.data.should.have.property('email').eql('danielshoit@gmail.com');
      res.body.data.should.have.property('address').eql('Ikorodu');
      res.body.should.have.property('message').eql('Registered Successfully');
    });
  });

  it('Should Return error if email field is empty or email field has whitespace only', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send(testUser).then(function (res) {
      expect(res).to.have.status(206);
      res.body.should.have.property('message').eql('Email must be included in the body');
    });
  });

  it('Should Return error if password field is empty or password field has only whitespace', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send({
      email: 'daniels@gmail.com',
      address: 'Home address'
    }).then(function (res) {
      expect(res).to.have.status(206);
      res.body.should.have.property('message').eql('password must be included in the body');
    });
  });

  it('Should Return error if email syntax is wrong, Email syntax should be dan@yahoo.com', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send({
      email: 'danielsgmail.com',
      address: 'Home address',
      name: 'opeyemi',
      password: 'daniel',
      confirmpassword: 'daniel'
    }).then(function (res) {
      expect(res).to.have.status(400);
      res.body.should.have.property('message').eql('Email format is wrong');
    });
  });

  it('Should Return error if email exists in the database. Email must be unique', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send({
      email: 'admin2@foodfast.com',
      address: 'Home address',
      name: 'opeyemi',
      password: 'daniel',
      confirmpassword: 'daniel'
    }).then(function (res) {
      expect(res).to.have.status(409);
      res.body.should.have.property('message').eql('Email already exist');
    });
  });

  it('Should Return error if password is not equal to confirm password', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send(fakeUser).then(function (res) {
      expect(res).to.have.status(400);
      res.body.should.have.property('message').eql('password and confirmpassword not equal');
    });
  });

  it('Should Return error if password length is less than 6', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send({
      email: 'admin@foodfast.com',
      address: 'Home address',
      name: 'opeyemi',
      password: 'dani',
      confirmpassword: 'dani'
    }).then(function (res) {
      expect(res).to.have.status(206);
      res.body.should.have.property('message').eql('password must be a minimum of 6 characters');
    });
  });

  it('Should Return error if password length is less than 6', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send({
      email: 'admin@foodfast.com',
      address: 'Home address',
      name: 'opeyemi',
      password: 'dani'
    }).then(function (res) {
      expect(res).to.have.status(400);
      res.body.should.have.property('message').eql('body must contain password and confirmpassword');
    });
  });

  it('Password should contain letters or numbers and any other characters', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send({
      email: 'admin@foodfast.com',
      address: 'Home address',
      name: 'opeyemi',
      password: '......',
      confirmpassword: '......'
    }).then(function (res) {
      expect(res).to.have.status(400);
      res.body.should.have.property('message').eql('Password must contain Letters or numbers');
    });
  });

  it('Password should not contain spaces', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send({
      email: 'admin@foodfast.com',
      address: 'Home address',
      name: 'opeyemi',
      password: 'zjj zz',
      confirmpassword: 'ajj zz'
    }).then(function (res) {
      expect(res).to.have.status(400);
      res.body.should.have.property('message').eql('password must not contain spaces');
    });
  });
});

// signin
describe('API endpoint for POST auth/login', function () {
  it('Should Login user given a valid credentials and user supply email and password', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/auth/login').send(newUserLogin).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('Object');
      res.body.should.have.property('message').eql('Login Successful');
      res.body.should.have.property('data');
      res.body.data.should.have.property('token');
    });
  });

  it('Should Return error if email is not included or email contain only whitespace', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/auth/login').send({
      password: 'daniel'
    }).then(function (res) {
      expect(res).to.have.status(206);
      expect(res.body).to.be.an('Object');
      res.body.should.have.property('message').eql('Email must be included in the body');
    });
  });

  it('Should Return error if password is not included or password contain only whitespace', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/auth/login').send({
      email: 'daniel@yahoo.com'
    }).then(function (res) {
      expect(res).to.have.status(206);
      expect(res.body).to.be.an('Object');
      res.body.should.have.property('message').eql('password must be included in the body');
    });
  });

  it('Should Return error if email does not exist, User must register before Login', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/auth/login').send({
      email: 'danielopeyemi@yahoo.com',
      password: 'daniele'
    }).then(function (res) {
      expect(res).to.have.status(403);
      expect(res.body).to.be.an('Object');
      res.body.should.have.property('message').eql('Incorrect email or password');
    });
  });

  it('Should Return error if password is wrong', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/auth/login').send({
      email: 'danielshoit@gmail.com',
      password: 'dani jjele'
    }).then(function (res) {
      expect(res).to.have.status(403);
      expect(res.body).to.be.an('Object');
      res.body.should.have.property('message').eql('Incorrect email or password');
    });
  });
});
// admin login

describe('API endpoint GET /auth/me', function () {
  it('Should return a particular user with all his/her credentials', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/auth/me').set('Authorization', 'Bearer ' + token2).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body.data).to.be.an('Array');
      res.body.should.have.property('message').eql('User returned Successfully');
    });
  });

  it('Should return failed if Token is not sent', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/auth/me').then(function (res) {
      expect(res).to.have.status(403);
      res.body.should.have.property('message').eql('Authentication fail, Please provide Token');
    });
  });

  it('Should send an error if an Invalid token is sent. Token must be send with the header', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/auth/me').set('Authorization', 'Bearer jdjdj').then(function (res) {
      expect(res).to.have.status(401);
      res.body.should.have.property('message').eql('Authentication fail, Incorrect Token');
    });
  });
});

describe('API endpoint GET /auth/logout', function () {
  it('Should logout a particular user and set token to null', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/auth/logout').set('Authorization', 'Bearer ' + token2).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body.data).to.be.an('Object');
      res.body.should.have.property('message').eql('User logged out Successfully');
    });
  });

  it('Should return failed if Token is not sent', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/auth/me').then(function (res) {
      expect(res).to.have.status(403);
      res.body.should.have.property('message').eql('Authentication fail, Please provide Token');
    });
  });

  it('Should send an error if an Invalid token is sent. Token must be send with the header', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/auth/me').set('Authorization', 'Bearer jdjdj').then(function (res) {
      expect(res).to.have.status(401);
      res.body.should.have.property('message').eql('Authentication fail, Incorrect Token');
    });
  });
});