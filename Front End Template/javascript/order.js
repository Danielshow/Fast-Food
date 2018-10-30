const input = document.getElementById('myInput');
const foodItems = document.getElementById('foodItems');
const orderFood = document.getElementById('orderfood');
const dialoghead = document.getElementById('dialoghead');
const dialogbody = document.getElementById('dialogbody');
const dialogfooter = document.getElementById('dialogfooter');
const dialogoverlay = document.getElementById('dialogoverlay');
const dialogbox = document.getElementById('dialogbox');
const placeOrder = document.getElementById('placeOrder');
const toast = document.getElementById('toast');
const logout = document.getElementById('logout');
const loadingOverlay = document.getElementById('loadingOverlay');
const loadingText = document.getElementById('loadingText');
const foodrows = document.getElementById('foodrows');
const confirmbutton = document.getElementById('confirmbutton');
const url = 'http://localhost:3000/api/v1/';
let token = null;
let foodObject = [];
const closeModal = (() => {
  dialogoverlay.style.display = 'none';
  dialogbox.style.display = 'none';
  dialogbody.innerHTML = '';
});

const closeModalClear = (() => {
  dialogoverlay.style.display = 'none';
  dialogbox.style.display = 'none';
  dialogbody.innerHTML = '';
});

const completeOrder = (() => {
  // const confirmbutton = document.getElementById('confirmbutton');
  const listOfFood = Array.from(dialogbody.getElementsByTagName('li'));
  const listOfQuantity = Array.from(document.getElementsByClassName('dialogTextbox'));
  const quantity = [];
  const price = [];
  const food = [];
  for (let i = 0; i < listOfFood.length; i += 1) {
    const [x, y] = listOfFood[i].innerText.split('₦');
    food.push(x.trim());
    price.push(y.trim());
    const {
      value,
    } = listOfQuantity[i];
    if (isNaN(value) || value.trim().length < 1) {
      document.getElementById('error').innerText = 'Quantity must be a number';
      return;
    }
    document.getElementById('error').innerText = '';
    quantity.push(value);
  }
  loadingText.innerHTML = `Chill while we place your orders <br>
        One cannot sleep well, love well, if one has not dined well
        <br>
       <img src="./images/gif/load (4).gif" alt="loading" id ="loading">`;
  loadingOverlay.style.display = 'flex';
  confirmbutton.disabled = true;
  placeOrderFood(food, price, quantity);
});

const placeOrderFood = (food, price, quantity) => {
  fetch(`${url}orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      food: food.join(),
      price: price.join(),
      quantity: quantity.join(),
    }),
  }).then(response => response.json()).then((data) => {
    if (data.status === 200) {
      foodObject = [];
      confirmbutton.disabled = false;
      loadingOverlay.style.display = 'none';
      customAlert.successAlert('Order successful');
      foodItems.innerHTML = '';
      return;
    }
    confirmbutton.disabled = false;
    loadingOverlay.style.display = 'none';
    customAlert.alert('Network Fail, Please try again');
  }).catch((err) => {
    confirmbutton.disabled = false;
    loadingOverlay.style.display = 'none';
    customAlert.alert('Network fail, Please try again');
  });
};
/* eslint-disable class-methods-use-this */
class MyAlert {
  alert(body) {
    dialogoverlay.style.display = 'block';
    dialogbox.style.display = 'block';
    dialoghead.innerText = 'Warning';
    dialogbody.innerHTML = '<img src="./images/icons/warning.png" alt="success" id="icons"><br>';
    dialogbody.innerHTML = '';
    dialogbody.innerHTML += body;
    dialogfooter.innerHTML = '<button class = \'close\' id = \'closebutton\'> Close </button>';
    const closebutton = document.getElementById('closebutton');
    closebutton.addEventListener('click', closeModal);
  }

  confirm(body) {
    dialogoverlay.style.display = 'block';
    dialogbox.style.display = 'block';
    dialogbox.style.top = '1%';
    dialoghead.innerText = 'Place Order (Add the quantity in the whitebox)';
    for (let i = 0; i < body.length; i += 1) {
      dialogbody.innerHTML += `<li class = "foodlinks"> ${body[i]} <input type="text" id="dialogTextbox" class="dialogTextbox" value = "1"></li>`;
    }
    dialogbody.innerHTML += '<div class = "error" id ="error"></div>';
    dialogfooter.innerHTML = '<button class = \'open\' id = \'confirmbutton\'> Order </button> <button class = \'close\' id = \'closebutton\'> Close </button>';
    const closebutton = document.getElementById('closebutton');
    closebutton.addEventListener('click', closeModalClear);
    // const confirmbutton = document.getElementById('confirmbutton');
    confirmbutton.addEventListener('click', completeOrder);
  }

  successAlert(body) {
    dialogoverlay.style.display = 'block';
    dialogbox.style.display = 'block';
    dialoghead.innerText = 'Success';
    dialogbody.innerHTML = '<img src="./images/icons/success.png" alt="success" id="icons"><br>';
    dialogbody.innerHTML = '';
    dialogbody.innerHTML += body;
    dialogfooter.innerHTML = '<button class = \'close\' id = \'closebutton\'> Close </button>';
    const closebutton = document.getElementById('closebutton');
    closebutton.addEventListener('click', closeModal);
  }

  addToast(body) {
    toast.style.display = 'block';
    toast.innerHTML = body;
  }
}

const customAlert = new MyAlert();

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

const fetchFood = () => {
  fetch(`${url}menu`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(response => response.json()).then((fooddata) => {
    if (fooddata.status === 200) {
      let food = null;
      for (let i = 0; i < fooddata.data.length; i += 1) {
        food = fooddata.data[i];
        foodrows.innerHTML += `<div class="col">
          <img src=${food.image} alt=${food.food} class="food_image">
          <h4> ${food.food} <br><span id="price">₦${food.price}</span><button type="button" name="button" id="but"><img src="./images/icons/cart.png" alt=""></button></h4>
        </div>`;
      }
      loadingOverlay.style.display = 'none';
    }
  });
};

const loadWindowsAndCheckAuth = (() => {
  loadingText.innerHTML = `Chill While we display the available meal <br>
  Ask not what you can do for your country. Ask what's for Lunch......
  <br>
 <img src="./images/gif/load (4).gif" alt="loading" id ="loading">`;
  loadingOverlay.style.display = 'flex';
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
      fetchFood();
    }).catch((err) => {
      window.location.replace('./login.html');
    });
  } else {
    window.location.replace('./login.html');
  }
});

const getFoodsFromClick = ((e) => {
  const target = e.target.parentNode;
  if (target && target.nodeName === 'H4') {
    const [food, price] = target.innerText.split('\n');
    foodObject.push(food.trim());
    const uniqueFood = new Set(foodObject);
    const orderquantity = foodItems.getElementsByTagName('li');
    if (orderquantity.length > 3) {
      customAlert.alert('You can only order four food at a time');
      return;
    }
    if (foodObject.length === uniqueFood.size) {
      foodItems.innerHTML += `<li class = 'list_food'> ${food} ${price} <button href="#" id="delete"> Delete </button> <br></li>`;
      customAlert.addToast(`${food} has been added to cart`);
      setTimeout(() => {
        toast.style.display = 'none';
      }, 3000);
    } else if (foodObject.length !== uniqueFood.size) {
      customAlert.alert('This food is already in your cart');
      foodObject = [...uniqueFood];
    }
  } else if (target && target.nodeName === 'LI' && target.className !== 'links' && target.className !== 'foodlinks') {
    let foodList = orderFood.getElementsByTagName('li');
    // remove food from list
    const foodToRemove = target.innerText.split('₦')[0].trim();
    const newFood = foodObject.filter(x => x !== foodToRemove);
    foodObject = newFood;
    foodList = Array.from(foodList).filter(x => x !== target);
    customAlert.addToast(`${target.innerText.split('₦')[0].trim()} has been removed from cart`);
    setTimeout(() => {
      toast.style.display = 'none';
    }, 3000);
    foodItems.innerHTML = '';
    for (let i = 0; i < foodList.length; i += 1) {
      foodItems.innerHTML += `<li> ${foodList[i].innerHTML} </li>`;
    }
  }
});

const orderFoodClick = (() => {
  const allFoods = [];
  let foods = foodItems.getElementsByTagName('li');
  foods = Array.from(foods);
  if (foods.length < 1) {
    customAlert.alert('This cart is empty, Add to Cart');
    return;
  }
  for (let i = 0; i < foods.length; i += 1) {
    allFoods.push(foods[i].innerText.split('Delete')[0].trim());
  }
  customAlert.confirm(allFoods);
});

const searchFunction = (() => {
  const dishes = document.getElementsByClassName('col');
  for (let i = 0; i < dishes.length; i += 1) {
    const td = dishes[i];
    if (td) {
      if (td.innerText.toLowerCase().indexOf(input.value.toLowerCase()) > -1) {
        td.style.display = '';
      } else {
        td.style.display = 'none';
      }
    }
  }
});

logout.addEventListener('click', logoutUser);
window.addEventListener('load', loadWindowsAndCheckAuth);
input.addEventListener('keyup', searchFunction);
placeOrder.addEventListener('click', orderFoodClick);
if (document.addEventListener) {
  document.addEventListener('click', getFoodsFromClick);
}
