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

var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGZvb2RmYXN0LmNvbSIsInVzZXJpZCI6MSwiaWF0IjoxNTM4NTgxMTI0fQ.ANn_QoRyNFwUGnBJIZxE-rSVAgk_s5o36C-KPTgRbP0';

var newUser = {
  email: 'danielshoit@gmail.com',
  name: 'opeyemi',
  password: 'daniel',
  address: 'Ikorodu'
};

var admin = {
  email: 'admin22@fastfood.com',
  name: 'opeyemi',
  password: 'daniel',
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
      expect(res.body.request).to.be.an('Object');
      res.body.request.should.have.property('name');
      res.body.request.should.have.property('email').eql('danielshoit@gmail.com');
      res.body.request.should.have.property('address').eql('Ikorodu');
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
      password: 'daniel'
    }).then(function (res) {
      expect(res).to.have.status(400);
      res.body.should.have.property('message').eql('Email format is wrong');
    });
  });

  it('Should Return error if email exists in the database. Email must be unique', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send({
      email: 'admin@foodfast.com',
      address: 'Home address',
      name: 'opeyemi',
      password: 'daniel'
    }).then(function (res) {
      expect(res).to.have.status(409);
      res.body.should.have.property('message').eql('Email already exist');
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
      res.body.should.have.property('token');
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
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('Object');
      res.body.should.have.property('message').eql('Email does not exist');
    });
  });

  it('Should Return error if password is wrong', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/auth/login').send({
      email: 'danielshoit@gmail.com',
      password: 'dani jjele'
    }).then(function (res) {
      expect(res).to.have.status(403);
      expect(res.body).to.be.an('Object');
      res.body.should.have.property('message').eql('Invalid Credentials');
    });
  });
});
// admin login

describe('API endpoint POST /auth/signup/admin', function () {
  it('Should create admin account with administrative priviledges given valid credentials', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/auth/signup/admin').set('Authorization', 'Bearer ' + token).send(admin).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body.request).to.be.an('Object');
      res.body.request.should.have.property('name').equal('opeyemi');
      res.body.request.should.have.property('address').eql('Ikorodu');
      res.body.should.have.property('message').eql('Registered Successfully');
    });
  });

  it('Should send auth failed if token is not sent. Token must be send with the header', function () {
    return _chai2.default.request(_index2.default).post('/api/v1/auth/signup/admin').send(admin).then(function (res) {
      expect(res).to.have.status(401);
      res.body.should.have.property('message').eql('Authentication fail');
    });
  });
});