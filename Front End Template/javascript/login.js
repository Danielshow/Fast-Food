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
const dialoghead = document.getElementById('dialoghead');
const dialogbody = document.getElementById('dialogbody');
const dialogfooter = document.getElementById('dialogfooter');
const dialogoverlay = document.getElementById('dialogoverlay');
const dialogbox = document.getElementById('dialogbox');
const loadingOverlay = document.getElementById('loadingOverlay');
let token = null;

const closeModal = (() => {
  dialogoverlay.style.display = 'none';
  dialogbox.style.display = 'none';
});

loginEmail.addEventListener('keyup', () => {
  error2.innerText = '';
});

loginPassword.addEventListener('keyup', () => {
  error2.innerText = '';
});

const clearError = () => {
  error.innerText = '';
}

email.addEventListener('keyup', clearError)
password.addEventListener('keyup', clearError)
confirmPassword.addEventListener('keyup', clearError)
name.addEventListener('keyup', clearError)
address.addEventListener('keyup', clearError)

window.addEventListener('load', () => {
  loadingOverlay.style.display = 'flex';
  if (localStorage.getItem('token') && localStorage.getItem('token') !== 'null') {
    token = localStorage.getItem('token');
    fetch(`${url}auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(response => response.json()).then((data) => {
      if (data.status === 200 && data.data[0].roles === 'user') {
        loadingOverlay.style.display = 'none';
        window.location.replace('./profile.html');
        return;
      }
      if (data.status === 200 && data.data[0].roles === 'admin') {
        loadingOverlay.style.display = 'none';
        window.location.replace('./admin-page.html');
        return;
      }
      loadingOverlay.style.display = 'none';
    }).catch((err) => {
      loadingOverlay.style.display = 'none';
    });
  } else {
    loadingOverlay.style.display = 'none';
  }
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

const signUpUser = () => {
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
      loadingOverlay.style.display = 'none';
      customAlert.alert('Thank You for registering, Proceed to Login');
      name.value = '';
      password.value = '';
      confirmPassword.value = '';
      address.value = '';
      email.value = '';
      error.innerText = '';
      return;
    }
    loadingOverlay.style.display = 'none';
    error.innerText = data.message;
  });
};

const register = ((e) => {
  e.preventDefault();
  if (!validateEmail(email.value.trim())) {
    error.innerText = 'Enter a valid email';
    return;
  } if (name.value.trim().length < 1) {
    error.innerText = 'Name cannot be empty';
    return;
  } if (password.value.trim().length < 6) {
    error.innerText = 'Password length must be greater than 6 and must not contain spaces';
    return;
  } if (password.value !== confirmPassword.value) {
    error.innerText = 'Password not match';
    return;
  } if (address.value.trim().length < 5) {
    error.innerText = 'Input ypur correct address';
    return;
  }
  loadingOverlay.style.display = 'flex';
  signUpUser();
});

const loginUser = () => {
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
    if (data.status === 200) {
      if (typeof (Storage) !== 'undefined') {
        localStorage.setItem('token', `${data.data.token}`);
      } if (data.data.roles === 'admin') {
        window.location.replace('./admin-page.html');
        return;
      }
      window.location.replace('./profile.html');
      return;
    }
    error2.innerText = data.message;
  });
};

const login = ((e) => {
  e.preventDefault();
  if (!validateEmail(loginEmail.value)) {
    error2.innerText = 'Enter a valid email';
    return;
  }
  if (loginPassword.value.trim().length < 6) {
    error2.innerText = 'Password length must be greater or equal to 6';
    return;
  }
  loginUser();
});
/* eslint-disable class-methods-use-this */

submit.addEventListener('click', register);
loginSubmit.addEventListener('click', login);
