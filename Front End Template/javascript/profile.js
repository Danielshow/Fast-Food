const url = 'http://localhost:3000/api/v1/';
const displayName = document.getElementById('name');
const getOrder = document.getElementById('getOrder');
const orderTable = document.getElementById('orderTable');
const gifImage = document.getElementById('gifImage');
const error = document.getElementById('error');
const logout = document.getElementById('logout');
const deleteUser = document.getElementById('delete');
const dialoghead = document.getElementById('dialoghead');
const dialogbody = document.getElementById('dialogbody');
const dialogfooter = document.getElementById('dialogfooter');
const dialogoverlay = document.getElementById('dialogoverlay');
const dialogbox = document.getElementById('dialogbox');
const loadingOverlay = document.getElementById('loadingOverlay');
let id = null;
let token = null;

const closeModal = (() => {
  dialogoverlay.style.display = 'none';
  dialogbox.style.display = 'none';
  dialogbody.innerHTML = '';
});

const confirmDelete = (() => {
  fetch(`${url}users`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(response => response.json()).then((data) => {
    if (data.status === 200) {
      if (typeof (Storage) !== 'undefined') {
        localStorage.setItem('token', 'null');
      }
      window.location.replace('./login.html');
    }
  });
});
/* eslint-disable class-methods-use-this */
class MyAlert {
  alert(body) {
    dialogoverlay.style.display = 'block';
    dialogbox.style.display = 'block';
    dialoghead.innerText = 'Warning';
    dialogbody.innerHTML = '<img src="./images/icons/warning.png" alt="warning" class="icons"><br>';
    dialogbody.innerHTML += body;
    dialogfooter.innerHTML = '<button class = \'close\' id = \'confirm\'> confirm </button><button class = \'close\' id = \'closebutton\'> Close </button>';
    const closebutton = document.getElementById('closebutton');
    closebutton.addEventListener('click', closeModal);
    const confirmbutton = document.getElementById('confirm');
    confirmbutton.addEventListener('click', confirmDelete);
  }

  alertOne(body) {
    dialogoverlay.style.display = 'block';
    dialogbox.style.display = 'block';
    dialoghead.innerText = 'OOOOPS';
    dialogbody.innerHTML = '<br>';
    dialogbody.innerHTML += body;
    dialogfooter.innerHTML = '<button class = \'close\' id = \'closebutton\'> Close </button>';
    const closebutton = document.getElementById('closebutton');
    closebutton.addEventListener('click', closeModal);
  }
}

const customAlert = new MyAlert();
window.addEventListener('load', () => {
  if (localStorage.getItem('token')) {
    token = localStorage.getItem('token');
    fetch(`${url}auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(response => response.json()).then((data) => {
      if (data.status !== 200) {
        window.location.replace('./login.html');
      }  if (data.data[0].roles === 'admin') {
        window.location.replace('./admin-page.html');
      }
      const { name } = data.data[0];
      id = data.data[0].id;
      displayName.innerText = `Welcome ${name}`;
    });
  } else {
    window.location.replace('./login.html');
  }
});


const getUserOrder = () => {
  loadingOverlay.style.display = 'flex';
  fetch(`${url}/users/${id}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(response => response.json()).then((data) => {
    if (data.status === 200) {
      loadingOverlay.style.display = 'none';
      orderTable.innerHTML = `<table id="myTable">
                                <thead>
                                  <tr class="orderrow">
                                    <th>Order ID</th>
                                    <th>Food</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                  </tr>
                                </thead>
                              </table>`;
      const table = document.getElementById('myTable');
      for (let i = 0; i < data.data.length; i += 1) {
        const info = data.data[i];
        const tr = `<tr class="orderrow">
                <td colname="Id">${info.id}</td>
                <td colname="Food">${info.food}</td>
                <td colname="Quantity">${info.quantity}</td>
                <td colname="Price">${info.price}</td>
                <td colname="Status">${info.status}</td>
              </tr>`;
        table.innerHTML += tr;
      }
    }
    if (data.status === 404) {
      loadingOverlay.style.display = 'none';
      error.style.display = 'block';
    }
  }).catch((err) => {
    loadingOverlay.style.display = 'none';
    customAlert.alertOne('Network Fail, Cannot Fetch your History')
  });
};

const logoutUser = ((e) => {
  e.preventDefault();
  fetch(`${url}auth/logout`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(response => response.json()).then((data) => {
    if (data.status === 200) {
      if (typeof (Storage) !== 'undefined') {
        localStorage.setItem('token', `${data.data.token}`);
      }
      window.location.replace('./login.html');
    }
  });
});

const deleteUserAccount = (() => {
  customAlert.alert('Are you sure you want to delete this Account');
});

deleteUser.addEventListener('click', deleteUserAccount);
getOrder.addEventListener('click', getUserOrder);
logout.addEventListener('click', logoutUser);
