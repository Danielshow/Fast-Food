const email = document.getElementById('email');
const password = document.getElementById('password');
const pwdRepeat = document.getElementById('psw-repeat');
const submit = document.getElementById('submit');
const error = document.getElementById('error');
const error2 = document.getElementById('error2');
const loginPassword = document.getElementById('loginPassword');
const loginEmail = document.getElementById('loginEmail');
const loginSubmit = document.getElementById('loginSubmit');

submit.addEventListener('click', register);
loginSubmit.addEventListener('click', login);

function register(e) {
  e.preventDefault();
  if (!validateEmail(email.value)) {
    error.innerText = 'Enter a valid email';
    return;
  } if (password.value.length < 6 || password.value.length < 6) {
    error.innerText = 'Password length must be greater than 6';
    return;
  } if (password.value !== pwdRepeat.value) {
    error.innerText = 'Password not match';
    return;
  }
  window.location.replace('../profile.html');
}

function login(e) {
  e.preventDefault();
  if (!validateEmail(loginEmail.value)) {
    error2.innerText = 'Enter a valid email';
    return;
  }
}


function validateEmail(em) {
  const re = /\S+@\S+\.\S+/;
  return re.test(em);
}
