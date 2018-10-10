const users = document.getElementById('users');
const order = document.getElementById('order');
const paymentMade = document.getElementById('payment_made');
const paymentbtn = document.getElementById('payment-click');
const orderbtn = document.getElementById('order_click');
const people = document.getElementById('people');
const userTable = document.getElementById('usertable');
const addFood = document.getElementById('add-food');
const addbtn = document.getElementById('message');
const toAdmin = document.getElementById('to_admin');
const url = 'http://localhost:3000/api/v1/';
let token = null;

// on page load, get all users
window.addEventListener('load', () => {
  if (localStorage.getItem('token')) {
    token = localStorage.getItem('token');
    fetch(`${url}auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(response => response.json()).then((data) => {
      if (data.status !== 200 || data.data[0].roles !== 'admin') {
        window.location.replace('./login.html');
      }
      fetch(`${url}users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(response => response.json()).then((datas) => {
        if (datas.status === 200) {
          for (let i = 0; i < datas.data.length; i += 1) {
            const info = datas.data[i];
            userTable.innerHTML += `<tr>
                                      <td>${info.id}</td>
                                      <td>${info.name}</td>
                                      <td>${info.email}</td>
                                      <td>${info.roles}</td>
                                      <td><button type="button" name="button" class="success" id="to_admin">To Admin</button></td>
                                      <td><button type="button" name="button" class="danger">Delete</button></td>
                                    </tr>`;
          }
        }
      });
    });
  } else {
    window.location.replace('./login.html');
  }
});

const clickEvent = (() => {
  people.style.display = 'block';
  order.style.display = 'none';
  paymentMade.style.display = 'none';
  addFood.style.display = 'none';
});

const orderEvent = (() => {
  order.style.display = 'block';
  people.style.display = 'none';
  paymentMade.style.display = 'none';
  addFood.style.display = 'none';
});

const paymentEvent = (() => {
  paymentMade.style.display = 'block';
  order.style.display = 'none';
  people.style.display = 'none';
  addFood.style.display = 'none';
});

const addEvent = (() => {
  addFood.style.display = 'block';
  order.style.display = 'none';
  people.style.display = 'none';
  paymentMade.style.display = 'none';
});

// Click Event
users.addEventListener('click', clickEvent);
orderbtn.addEventListener('click', orderEvent);
paymentbtn.addEventListener('click', paymentEvent);
addbtn.addEventListener('click', addEvent);
toAdmin.addEventListener('click', changeToAdmin);
