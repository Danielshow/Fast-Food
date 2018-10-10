const users = document.getElementById('users');
const order = document.getElementById('order');
const paymentMade = document.getElementById('payment_made');
const paymentbtn = document.getElementById('payment-click');
const orderbtn = document.getElementById('order_click');
const people = document.getElementById('people');
const userTable = document.getElementById('usertable');
const addFood = document.getElementById('add-food');
const addbtn = document.getElementById('message');
const submitFood = document.getElementById('action');


const url = 'http://localhost:3000/api/v1/';
let token = null;

const loadWindows = (() => {
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
          userTable.innerHTML = `<thead>
                                    <tr>
                                      <th>User ID</th>
                                      <th>Name</th>
                                      <th>Email</th>
                                      <th>roles</th>
                                      <th>Upgrade</th>
                                      <th>Delete Account</th>
                                    </tr>
                                  </thead>`
          for (let i = 0; i < datas.data.length; i += 1) {
            const info = datas.data[i];
            userTable.innerHTML += `<tr>
                                      <td colname="ID">${info.id}</td>
                                      <td colname="Name">${info.name}</td>
                                      <td colname="Email">${info.email}</td>
                                      <td colname="Roles">${info.roles}</td>
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

// on page load, get all users
window.addEventListener('load', () => {
  loadWindows();
});

const changeToAdmin = ((e) => {
  if (e.target.className === 'success') {
    const id = Number(e.target.parentNode.parentNode.childNodes[1].innerText);
    fetch(`${url}/users/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        roles: 'admin',
      }),
    }).then(response => response.json()).then((data) => {
      if (data.status === 200) {
        alert('User promoted to admin successfully');
        loadWindows();
      }
    });
  }
});

const postFood = ((e) => {
  e.preventDefault();
  const formData = new FormData(document.forms.myForm)
  console.log(formData);
  fetch(`${url}/menu`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  }).then(response => response.json()).then((data) => {
    console.log(data);
  })
});

const clickEvent = (() => {
  people.style.display = 'block';
  loadWindows();
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
submitFood.addEventListener('click', postFood);
if (document.addEventListener) {
  document.addEventListener('click', changeToAdmin);
}
