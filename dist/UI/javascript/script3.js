'use strict';

var email = document.getElementById('email');
var password = document.getElementById('password');
var confirmPassword = document.getElementById('psw-repeat');
var submit = document.getElementById('submit');
var error = document.getElementById('error');
var error2 = document.getElementById('error2');
var loginPassword = document.getElementById('loginPassword');
var loginEmail = document.getElementById('loginEmail');
var loginSubmit = document.getElementById('loginSubmit');

submit.addEventListener('click', register);
loginSubmit.addEventListener('click', login);

register = function register(e) {
  e.preventDefault();
  if (!validateEmail(email.value)) {
    error.innerText = 'Enter a valid email';
    return;
  }if (password.value.length < 6) {
    error.innerText = 'Password length must be greater than 6';
    return;
  }if (password.value !== confirmPassword.value) {
    error.innerText = 'Password not match';
    return;
  }
  window.location.replace('../profile.html');
};

login = function login(e) {
  e.preventDefault();
  if (!validateEmail(loginEmail.value)) {
    error2.innerText = 'Enter a valid email';
    return;
  }
};

validateEmail = function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(emial);
};