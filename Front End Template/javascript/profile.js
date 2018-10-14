const url = 'https://evening-island-29552.herokuapp.com/api/v1/';
const displayName = document.getElementById('name');
const getOrder = document.getElementById('getOrder');
const orderTable = document.getElementById('orderTable');
const gifImage = document.getElementById('gifImage');
const error = document.getElementById('error');
const logout = document.getElementById('logout');
let id = null;
let token = null;

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
  gifImage.style.display = 'block';
  fetch(`${url}/users/${id}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(response => response.json()).then((data) => {
    if (data.status === 200) {
      gifImage.style.display = 'none';
      orderTable.innerHTML = `<table id="myTable">
                                <tr class="orderrow">
                                  <th>Order ID</th>
                                  <th>Food</th>
                                  <th>Quantity</th>
                                  <th>Price</th>
                                  <th>Status</th>
                                </tr>
                              </table>`;
      const table = document.getElementById('myTable');
      for (let i = 0; i < data.data.length; i += 1) {
        const info = data.data[i];
        const tr = `<tr class="orderrow">
                <td>${info.id}</td>
                <td>${info.food}</td>
                <td>${info.quantity}</td>
                <td>${info.price}</td>
                <td>${info.status}</td>
              </tr>`;
        table.innerHTML += tr;
      }
    }
    if (data.status === 404) {
      gifImage.style.display = 'none';
      error.style.display = 'block';
    }
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

getOrder.addEventListener('click', getUserOrder);
logout.addEventListener('click', logoutUser);
