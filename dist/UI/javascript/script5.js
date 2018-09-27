'use strict';

var users = document.getElementById('users');
var order = document.getElementById('order');
var paymentMade = document.getElementById('payment_made');
var paymentbtn = document.getElementById('payment-click');
var orderbtn = document.getElementById('order_click');
var people = document.getElementById('people');
var addFood = document.getElementById('add-food');
var addbtn = document.getElementById('message');

// Click Event
users.addEventListener('click', clickEvent);
orderbtn.addEventListener('click', orderEvent);
paymentbtn.addEventListener('click', paymentEvent);
addbtn.addEventListener('click', addEvent);

clickEvent = function clickEvent() {
  people.style.display = 'block';
  order.style.display = 'none';
  paymentMade.style.display = 'none';
  addFood.style.display = 'none';
};

orderEvent = function orderEvent() {
  order.style.display = 'block';
  people.style.display = 'none';
  paymentMade.style.display = 'none';
  addFood.style.display = 'none';
};

paymentEvent = function paymentEvent() {
  paymentMade.style.display = 'block';
  order.style.display = 'none';
  people.style.display = 'none';
  addFood.style.display = 'none';
};

addEvent = function addEvent() {
  addFood.style.display = 'block';
  order.style.display = 'none';
  people.style.display = 'none';
  paymentMade.style.display = 'none';
};