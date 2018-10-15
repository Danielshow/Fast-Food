const users = document.getElementById('users');
const order = document.getElementById('order');
const paymentMade = document.getElementById('payment_made');
const paymentbtn = document.getElementById('payment-click');
const orderbtn = document.getElementById('order_click');
const people = document.getElementById('people');
const userTable = document.getElementById('usertable');
const menuTable = document.getElementById('myTable2');
const orderTable = document.getElementById('orderTable');
const addFood = document.getElementById('add-food');
const addbtn = document.getElementById('message');
const submitFood = document.getElementById('action');
const loadingGif = document.getElementById('loadingGif');
const usererror = document.getElementById('usererror');
const loadingGif2 = document.getElementById('loadingGif2');
const foodError = document.getElementById('foodError');
const food = document.getElementById('textInp');
const price = document.getElementById('priceInp');
const dialoghead = document.getElementById('dialoghead');
const dialogbody = document.getElementById('dialogbody');
const dialogfooter = document.getElementById('dialogfooter');
const dialogoverlay = document.getElementById('dialogoverlay');
const dialogbox = document.getElementById('dialogbox');
const logout = document.getElementById('logout');
let status = null;
const url = 'http://localhost:3000/api/v1/';
let token = null;
let id = null;

const closeModal = (() => {
  dialogoverlay.style.display = 'none';
  dialogbox.style.display = 'none';
});

const confirmTrueAdmin = (() => {
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
      customAlert.alert('User promoted to admin successfully');
      loadWindows();
    }
  });
  dialogoverlay.style.display = 'none';
  dialogbox.style.display = 'none';
});

const confirmTrueDelete = (() => {
  fetch(`${url}/menu/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(response => response.json()).then((data) => {
    if (data.status === 200) {
      customAlert.alert('Food Deleted successfully');
      loadAvailableFoods();
    }
  });
});

const confirmTrueDeleteUser = (() => {
  fetch(`${url}/users/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(response => response.json()).then((data) => {
    if (data.status === 200) {
      customAlert.alert('Account Deleted successfully');
      loadAvailableUsers();
    }
  });
});

const confirmTrueEditFood = (() => {
  const textInpEdit = document.getElementById('textInputEdit');
  const priceInpEdit = document.getElementById('priceInpEdit');
  const erroredit = document.getElementById('erroredit');
  if (textInpEdit.value.trim().length < 1) {
    erroredit.innerText = 'Food cannot be empty';
    return;
  }
  if (priceInpEdit.value.trim().length < 1) {
    erroredit.innerText = 'Price cannot be empty';
    return;
  }
  const formData = new FormData(document.forms.myEditForm);
  fetch(`${url}/menu/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  }).then(response => response.json()).then((data) => {
    if (data.status === 200) {
      customAlert.alert('Food Updated successfully');
      loadAvailableFoods();
    }
  });
});

const confirmStatusChange = (() => {
  fetch(`${url}/orders/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status,
    }),
  }).then(response => response.json()).then((data) => {
    if (data.status === 200) {
      customAlert.alert('Food status changed');
      loadAvailableOrders();
    }
  });
});

const confirmAction = ((body) => {
  dialogoverlay.style.display = 'block';
  dialogbox.style.display = 'block';
  dialoghead.innerText = 'Attention';
  dialogbody.innerHTML = '<img src="./images/icons/warning.png" alt="success" id="icons"><br>';
  dialogbody.innerHTML += body;
  dialogfooter.innerHTML = '<button class = \'close\' id = \'confirm\'> YES </button> <button class = \'open\' id = \'closebutton\'> NO </button>';
  const closebutton = document.getElementById('closebutton');
  closebutton.addEventListener('click', closeModal);
});
/* eslint-disable class-methods-use-this */
class MyAlert {
  alert(body) {
    dialogoverlay.style.display = 'block';
    dialogbox.style.display = 'block';
    dialoghead.innerText = 'Attention';
    dialogbody.innerHTML = '<img src="./images/icons/success.png" alt="success" id="icons"><br>';
    dialogbody.innerHTML += body;
    dialogfooter.innerHTML = '<button class = \'close\' id = \'closebutton\'> Close </button>';
    const closebutton = document.getElementById('closebutton');
    closebutton.addEventListener('click', closeModal);
  }

  confirmAdmin(body) {
    confirmAction(body);
    const confirm = document.getElementById('confirm');
    confirm.addEventListener('click', confirmTrueAdmin);
  }

  confirmDelete(body) {
    confirmAction(body);
    const confirm = document.getElementById('confirm');
    confirm.addEventListener('click', confirmTrueDelete);
  }

  confirmDeleteUser(body) {
    confirmAction(body);
    const confirm = document.getElementById('confirm');
    confirm.addEventListener('click', confirmTrueDeleteUser);
  }

  editFood() {
    dialogoverlay.style.display = 'block';
    dialogbox.style.display = 'block';
    dialoghead.innerText = 'Update Food';
    dialogbody.innerHTML = `
    <form action="" method="post" enctype="multipart/form-data" id="myEditForm">
      <label for="">Food Name:</label><br>
      <input type="text" placeholder="Enter food Name" name="food" id="textInputEdit"><br>

      <label for="">Price:</label><br>
      <input type="text" placeholder="Enter the price" name="price" id="priceInpEdit"><br>

      <label for=""> Food Image</label>
      <input type="file" name="foodImage" value="" id="foodImageEdit"> <br>
      <div class='erroredit' id="erroredit"></div>
    </form>
    `;
    dialogfooter.innerHTML = '<button class = \'close\' id = \'confirm\'> YES </button> <button class = \'open\' id = \'closebutton\'> NO </button>';
    const closebutton = document.getElementById('closebutton');
    closebutton.addEventListener('click', closeModal);
    const confirm = document.getElementById('confirm');
    confirm.addEventListener('click', confirmTrueEditFood);
  }

  confirmOrderStatus(body) {
    confirmAction(body);
    const confirm = document.getElementById('confirm');
    confirm.addEventListener('click', confirmStatusChange);
  }
}

const customAlert = new MyAlert();

const loadAvailableUsers = (() => {
  fetch(`${url}users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(response => response.json()).then((datas) => {
    if (datas.status === 200) {
      loadingGif.style.display = 'none';
      userTable.innerHTML = `<thead>
                                <tr>
                                  <th>User ID</th>
                                  <th>Name</th>
                                  <th>Email</th>
                                  <th>roles</th>
                                  <th>Upgrade</th>
                                  <th>Delete Account</th>
                                </tr>
                              </thead>`;
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
  }).catch((err) => {
    usererror.innerHTML = 'Cannot fetch user now, Kindly reload';
  });
});

const loadAvailableOrders = (() => {
  fetch(`${url}orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(response => response.json()).then((datas) => {
    if (datas.status === 200 && datas.data.length > 0) {
      loadingGif.style.display = 'none';
      orderTable.innerHTML = `<thead>
                                <tr>
                                  <th>Order ID</th>
                                  <th>Food</th>
                                  <th>Quantity</th>
                                  <th>Amount</th>
                                  <th>UserId</th>
                                  <th>Status</th>
                                  <th>Button</th>
                                  <th>Decline</th>
                                </tr>
                              </thead>`;
      for (let i = 0; i < datas.data.length; i += 1) {
        const info = datas.data[i];
        orderTable.innerHTML += `<tr>
                                  <td colname="Order ID">${info.id}</td>
                                  <td colname="Food">${info.food}</td>
                                  <td colname="Quantity">${info.quantity}</td>
                                  <td colname="Amount">${info.price}</td>
                                  <td colname="User ID">${info.user_id}</td>
                                  <td colname="Status">${info.status}</td>
                                  <td><button type="button" name="button" class="processing">processing</button><button type="button" name="button" class="complete">complete</button></td>
                                  <td><button type="button" name="button" class="cancel">Cancel</button></td>
                                </tr>`;
      }
    }
  }).catch((err) => {
    // usererror.innerHTML = 'Cannot fetch user now, Kindly reload';
  });
});
const loadWindows = (() => {
  if (localStorage.getItem('token')) {
    token = localStorage.getItem('token');
    loadingGif.style.display = 'block';
    fetch(`${url}auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(response => response.json()).then((data) => {
      if (data.status !== 200 || data.data[0].roles !== 'admin') {
        window.location.replace('./login.html');
      }
      loadAvailableUsers();
    });
  } else {
    window.location.replace('./login.html');
  }
});

const loadAvailableFoods = (() => {
  loadingGif2.style.display = 'block';
  fetch(`${url}menu`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(response => response.json()).then((data) => {
    if (data.status === 200) {
      loadingGif2.style.display = 'none';
      menuTable.innerHTML = `<thead>
                              <tr>
                                  <th> ID </th>
                                  <th> Food </th>
                                  <th> Price </th>
                                  <th> Edit </th>
                                  <th> Delete </th>
                              </tr>
                            </thead>`;
      for (let i = 0; i < data.data.length; i += 1) {
        const info = data.data[i];
        menuTable.innerHTML += `<tr>
                                  <td colname="ID">${info.id}</td>
                                  <td colname="Food">${info.food}</td>
                                  <td colname="price">${info.price}</td>
                                  <td><button type="button" name="button" class="edit"> Edit </button></td>
                                  <td><button type="button" name="button" class="delete"> Delete</button></td>
                               </tr>`;
      }
    }
  }).catch((err) => {
    foodError.innerHTML = 'Cannot Fetch User, Please Reload';
  });
});

// on page load, get all users
window.addEventListener('load', () => {
  loadWindows();
  loadAvailableFoods();
});

const adminFunction = ((e) => {
  if (e.target.className === 'success') {
    id = Number(e.target.parentNode.parentNode.childNodes[1].innerText);
    customAlert.confirmAdmin('Are you sure you want to change this user to Admin');
  }
  if (e.target.className === 'delete') {
    id = Number(e.target.parentNode.parentNode.childNodes[1].innerText);
    customAlert.confirmDelete('Are you sure you want to delete this food');
  }
  if (e.target.className === 'edit') {
    id = Number(e.target.parentNode.parentNode.childNodes[1].innerText);
    customAlert.editFood();
  }
  if (e.target.className === 'danger') {
    id = Number(e.target.parentNode.parentNode.childNodes[1].innerText);
    customAlert.confirmDeleteUser('Are you sure you want to delete this account');
  }
  if (e.target.className === 'cancel') {
    id = Number(e.target.parentNode.parentNode.childNodes[1].innerText);
    status = 'cancelled';
    customAlert.confirmOrderStatus('Change order status as cancelled');
  }

  if (e.target.className === 'processing') {
    id = Number(e.target.parentNode.parentNode.childNodes[1].innerText);
    status = 'processing';
    customAlert.confirmOrderStatus('change order status as processing');
  }

  if (e.target.className === 'complete') {
    id = Number(e.target.parentNode.parentNode.childNodes[1].innerText);
    status = 'complete';
    customAlert.confirmOrderStatus('change order status as completed');
  }
});

const postFood = ((e) => {
  e.preventDefault();
  if (food.value.trim().length < 1) {
    foodError.innerText = 'Food cannot be empty';
    return;
  }
  if (price.value.trim().length < 1) {
    foodError.innerText = 'Price cannot be empty';
    return;
  }
  const formData = new FormData(document.forms.myForm);
  fetch(`${url}/menu`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  }).then(response => response.json()).then((data) => {
    if (data.status === 200) {
      food.value = '';
      price.value = '';
      loadAvailableFoods();
    }
  });
});

const logoutAdmin = (() => {
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
const clickEvent = (() => {
  people.style.display = 'block';
  loadWindows();
  order.style.display = 'none';
  paymentMade.style.display = 'none';
  addFood.style.display = 'none';
});

const orderEvent = (() => {
  loadAvailableOrders();
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
logout.addEventListener('click', logoutAdmin)
users.addEventListener('click', clickEvent);
orderbtn.addEventListener('click', orderEvent);
paymentbtn.addEventListener('click', paymentEvent);
addbtn.addEventListener('click', addEvent);
submitFood.addEventListener('click', postFood);
if (document.addEventListener) {
  document.addEventListener('click', adminFunction);
}
