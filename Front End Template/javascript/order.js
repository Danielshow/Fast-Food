const input = document.getElementById('myInput');
const foodItems = document.getElementById('foodItems');
const orderFood = document.getElementById('orderfood');
const dialoghead = document.getElementById('dialoghead');
const dialogbody = document.getElementById('dialogbody');
const dialogfooter = document.getElementById('dialogfooter');
const dialogoverlay = document.getElementById('dialogoverlay');
const dialogbox = document.getElementById('dialogbox');
const placeOrder = document.getElementById('placeOrder');

const closeModal = (() => {
  dialogoverlay.style.display = 'none';
  dialogbox.style.display = 'none';
});

const closeModalClear = (() => {
  dialogoverlay.style.display = 'none';
  dialogbox.style.display = 'none';
  dialogbody.innerHTML = '';
});

/* eslint-disable class-methods-use-this */
class MyAlert {
  alert(body) {
    dialogoverlay.style.display = 'block';
    dialogbox.style.display = 'block';
    dialoghead.innerText = 'Success';
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
    dialoghead.innerText = 'Place Order';
    for (let i = 0; i < body.length; i += 1) {
      dialogbody.innerHTML += `<li>${body[i]}</li>`;
    }
    dialogfooter.innerHTML = '<button class = \'open\' id = \'confirmbutton\'> Order </button> <button class = \'close\' id = \'closebutton\'> Close </button>';
    const closebutton = document.getElementById('closebutton');
    closebutton.addEventListener('click', closeModalClear);
  }
}

const customAlert = new MyAlert();

let foodObject = [];
const getFoodsFromClick = ((e) => {
  if (e.target.parentNode && e.target.parentNode.nodeName === 'H4') {
    const [food, price] = e.target.parentNode.innerText.split('\n');
    foodObject.push(food.trim());
    const uniqueFood = new Set(foodObject);
    if (foodObject.length === uniqueFood.size) {
      foodItems.innerHTML += `<li> ${food} ${price} <button href="#" id="delete"> Delete </button> <br></li>`;
    } else {
      customAlert.alert('This food is already in your cart');
      foodObject = [...uniqueFood];
    }
  } else if (e.target.parentNode && e.target.parentNode.nodeName === 'LI') {
    let foodList = orderFood.getElementsByTagName('li');
    // remove food from list
    const foodToRemove = e.target.parentNode.innerText.split('$')[0].trim();
    const newFood = foodObject.filter(x => x !== foodToRemove);
    foodObject = newFood;
    foodList = Array.from(foodList).filter(x => x !== e.target.parentNode);
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

input.addEventListener('keyup', searchFunction);
placeOrder.addEventListener('click', orderFoodClick);
if (document.addEventListener) {
  document.addEventListener('click', getFoodsFromClick);
}
