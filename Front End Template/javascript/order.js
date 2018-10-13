const input = document.getElementById('myInput');
const foodItems = document.getElementById('foodItems');
const orderFood = document.getElementById('orderfood');
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
    dialogbody.innerHTML = '<img src="./images/icons/warning.png" alt="success" id="icons"><br>';
    dialogbody.innerHTML += body;
    dialogfooter.innerHTML = '<button class = \'close\' id = \'closebutton\'> Close </button>';
    const closebutton = document.getElementById('closebutton');
    closebutton.addEventListener('click', closeModal);
  }
}

const customAlert = new MyAlert();

let obj = [];
const getFoodsFromClick = ((e) => {
  if (e.target.parentNode && e.target.parentNode.nodeName === 'H4') {
    const [food, price] = e.target.parentNode.innerText.split('\n');
    obj.push(food);
    const enw = new Set(obj);
    if (obj.length === enw.size) {
      foodItems.innerHTML += `<li> ${food} ${price} <button href="#" id="delete"> Delete </button> <br></li>`;
    } else {
      customAlert.alert('This food is already in your cart');
      obj = [...enw];
    }
  } else if (e.target.parentNode && e.target.parentNode.nodeName === 'LI') {
    let foodList = orderFood.getElementsByTagName('li');
    foodList = Array.from(foodList).filter(x => x !== e.target.parentNode);
    foodItems.innerHTML = '';
    for (let i = 0; i < foodList.length; i += 1) {
      foodItems.innerHTML += `<li> ${foodList[i].innerHTML} </li>`;
    }
  }
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
if (document.addEventListener) {
  document.addEventListener('click', getFoodsFromClick);
}
