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
var usertoken = process.env.TOKEN2;

describe('API endpoint for GET all users /users', function () {
  it('Should return all users given an admin token is added', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/users').set('Authorization', 'Bearer ' + token).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body.data).to.be.an('Array');
      res.body.should.have.property('type').eql('GET');
      res.body.should.have.property('message').eql('All users returned successfully');
    });
  });

  it('Should Return error if token is not added', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/users').then(function (res) {
      expect(res).to.have.status(403);
      res.body.should.have.property('message').eql('Authentication fail, Please provide Token');
    });
  });

  it('Should Return error if Incorrect token is added', function () {
    return _chai2.default.request(_index2.default).get('/api/v1/users').set('Authorization', 'Bearer dkdkdkdk').then(function (res) {
      expect(res).to.have.status(401);
      res.body.should.have.property('message').eql('Authentication fail, Incorrect Token');
    });
  });
});

describe('API endpoint to Update user roles using /users', function () {
  it('Should update a user to admin', function () {
    return _chai2.default.request(_index2.default).put('/api/v1/users/1').set('Authorization', 'Bearer ' + token).send({
      roles: 'Admin'
    }).then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('Object');
      res.body.should.have.property('type').eql('PUT');
      res.body.should.have.property('message').eql('User promoted to admin successfully');
    });
  });

  it('Should return error if roles field is only whitespace', function () {
    return _chai2.default.request(_index2.default).put('/api/v1/users/2').set('Authorization', 'Bearer ' + token).send({
      roles: ' '
    }).then(function (res) {
      expect(res).to.have.status(400);
      res.body.should.have.property('message').eql('roles must be included in the body');
    });
  });

  it('Should return error if ID is not a number', function () {
    return _chai2.default.request(_index2.default).put('/api/v1/users/dkddk').set('Authorization', 'Bearer ' + token).send({
      roles: ' '
    }).then(function (res) {
      expect(res).to.have.status(403);
      res.body.should.have.property('message').eql('ID must be a number and less than 9000');
    });
  });

  it('Should return error if roles is not admin or user', function () {
    return _chai2.default.request(_index2.default).put('/api/v1/users/1').set('Authorization', 'Bearer ' + token).send({
      roles: 'dgddgh'
    }).then(function (res) {
      expect(res).to.have.status(400);
      res.body.should.have.property('message').eql('Roles must be either Admin or Users');
    });
  });
});

describe('API endpoint for DELETE user /users', function () {
  it('Should return success if an account is sucessfully deleted', function () {
    return _chai2.default.request(_index2.default).delete('/api/v1/users').set('Authorization', 'Bearer ' + usertoken).then(function (res) {
      expect(res).to.have.status(200);
      res.body.should.have.property('type').eql('DELETE');
      res.body.should.have.property('message').eql('Account successfully deleted');
    });
  });

  it('Should Return error if token is not added', function () {
    return _chai2.default.request(_index2.default).delete('/api/v1/users').then(function (res) {
      expect(res).to.have.status(403);
      res.body.should.have.property('message').eql('Authentication fail, Please provide Token');
    });
  });

  it('Should Return error if Incorrect token is added', function () {
    return _chai2.default.request(_index2.default).delete('/api/v1/users').set('Authorization', 'Bearer dkdkdkdk').then(function (res) {
      expect(res).to.have.status(401);
      res.body.should.have.property('message').eql('Authentication fail, Incorrect Token');
    });
  });
});

describe('API endpoint for DELETE users by ID /users/:id', function () {
  it('Should return success if admin delete a user', function () {
    return _chai2.default.request(_index2.default).delete('/api/v1/users/1').set('Authorization', 'Bearer ' + token).then(function (res) {
      expect(res).to.have.status(200);
      res.body.should.have.property('type').eql('DELETE');
      res.body.should.have.property('message').eql('User Deleted successfully');
    });
  });
});