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
const gifImage = document.getElementById('gifImage');
const url = 'http://localhost:3000/api/v1/';
const dialoghead = document.getElementById('dialoghead');
const dialogbody = document.getElementById('dialogbody');
const dialogfooter = document.getElementById('dialogfooter');
const dialogoverlay = document.getElementById('dialogoverlay');
const dialogbox = document.getElementById('dialogbox');

const closeModal = (() => {
  dialogoverlay.style.display = 'none';
  dialogbox.style.display = 'none';
});

/* eslint-disable class-methods-use-this */
class MyAlert {
  alert(body) {
    dialogoverlay.style.display = 'block';
    dialogbox.style.display = 'block';
    dialoghead.innerText = 'Success';
    dialogbody.innerHTML = '<img src="./images/icons/success.png" alt="success" id="icons"><br>';
    dialogbody.innerHTML += body;
    dialogfooter.innerHTML = '<button class = \'close\' id = \'closebutton\'> Close </button>';
    const closebutton = document.getElementById('closebutton');
    closebutton.addEventListener('click', closeModal);
  }
}

const customAlert = new MyAlert();

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
  gifImage.style.display = 'block';
  fetch(`${url}auth/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name.value.trim(),
      password: password.value,
      confirmpassword: confirmPassword.value,
      address: address.value,
      email: email.value,
    }),
  }).then(response => response.json()).then((data) => {
    if (data.status === 200) {
      gifImage.style.display = 'none';
      customAlert.alert('Thank You for registering, Proceed to Login');
      name.value = '';
      password.value = '';
      confirmPassword.value = '';
      address.value = '';
      email.value = '';
      error.innerText = '';
      return;
    }
    gifImage.style.display = 'none';
    error.innerText = data.message;
  });
});

const login = ((e) => {
  e.preventDefault();
  if (!validateEmail(loginEmail.value)) {
    error2.innerText = 'Enter a valid email';
    return;
  }
  fetch(`${url}auth/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: loginEmail.value,
      password: loginPassword.value,
    }),
  }).then(response => response.json()).then((data) => {
    console.log(data);
    if (data.status === 200) {
      if (typeof (Storage) !== 'undefined') {
        localStorage.setItem('token', `${data.data.token}`);
      } if (data.data.roles === 'admin') {
        window.location.replace('./admin-page.html');
        return;
      }
      window.location.replace('./profile.html');
    }
    error2.innerText = data.message;
  });
});

/* eslint-disable class-methods-use-this */

submit.addEventListener('click', register);
loginSubmit.addEventListener('click', login);
