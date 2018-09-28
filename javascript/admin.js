const users = document.getElementById('users');
const order = document.getElementById('order');
const paymentMade = document.getElementById('payment_made');
const paymentbtn = document.getElementById('payment-click');
const orderbtn = document.getElementById('order_click');
const people = document.getElementById('people');
const addFood = document.getElementById('add-food');
const addbtn = document.getElementById('message');


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
