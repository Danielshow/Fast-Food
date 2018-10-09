const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('psw-repeat');
const name = document.getElementById('name');
const address = document.getElementById('address');
const submit = document.getElementById('submit');
const error = document.getElementById('error');
const error2 = document.getElementById('error2');
const loginPassword = document.getElementById('loginPassword');
const loginEmail = document.getElementById('loginEmail');
const loginSubmit = document.getElementById('loginSubmit');
const url = 'http://localhost:3000/api/v1/';


const validateEmail = ((emailInput) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(emailInput);
});

const register = ((e) => {
  e.preventDefault();
  if (!validateEmail(email.value.trim())) {
    error.innerText = 'Enter a valid email';
    return;
  } if (password.value.length < 6) {
    error.innerText = 'Password length must be greater than 6';
    return;
  } if (password.value !== confirmPassword.value) {
    error.innerText = 'Password not match';
    return;
  } if (address.value.trim().length < 6) {
    error.innerText = 'Incorrect address';
    return;
  } if (name.value.trim().length < 1) {
    error.innerText = 'Name cannot be empty';
    return;
  }
  fetch(`${url}auth/signup`, {
    mode: 'no-cors',
    method: 'POST',
    body: JSON.stringify({
      name: name.value.trim(),
      password: password.value,
      confirmpassword: confirmPassword.value,
      address: address.value,
      email: email.value,
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded, text/plain, */*; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'HEAD, GET, POST. PUT, PATCH, DELETE',
      'Access-Control-Allow-headers': 'Origin, Content-Type, X-Auth-Token',
    },
  }).then(response => response.json()).then((data) => {
    console.log(data);
  });
  // window.location.replace('./profile.html');
});

const login = ((e) => {
  e.preventDefault();
  if (!validateEmail(loginEmail.value)) {
    error2.innerText = 'Enter a valid email';
  }
});


submit.addEventListener('click', register);
loginSubmit.addEventListener('click', login);
