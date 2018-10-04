const input = document.getElementById('myInput');
const foodItems = document.getElementById('foodItems');
const deleteOrder = document.getElementById('delete');
const orderFood = document.getElementById('orderfood');


const getFoodsFromClick = ((e) => {
  if (e.target.parentNode && e.target.parentNode.nodeName === 'H4') {
    const [food, price] = e.target.parentNode.innerText.split('\n');
    foodItems.innerHTML += `<li> ${food} ${price} <a href="#" id="delete"> Delete </a> <br></li>`;
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
