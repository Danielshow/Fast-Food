'use strict';

var breakfast = document.getElementById('breakfast');
var lunch = document.getElementById('lunch');
var dinner = document.getElementById('dinner');
var button1 = document.getElementById('button1');
var button2 = document.getElementById('button2');
var button3 = document.getElementById('button3');

// Helper functions
var addStyle = function addStyle(button) {
  button.style.backgroundColor = 'white';
  button.style.color = 'black';
};

var removeStyle = function removeStyle(button1, button2) {
  button1.style.backgroundColor = 'rgb(224, 108, 65)';
  button1.style.color = 'white';
  button2.style.backgroundColor = 'rgb(224, 108, 65)';
  button2.style.color = 'white';
};

var disableButton = function disableButton(btn1, btn2) {
  btn1.disabled = false;
  btn2.disabled = false;
};

var buttonOneDefault = function buttonOneDefault() {
  button1.disabled = true;
  button1.style.backgroundColor = 'white';
  button1.style.color = 'black';
};

var breakfastEvent = function breakfastEvent() {
  breakfast.style.display = 'block';
  lunch.style.display = 'none';
  dinner.style.display = 'none';
  addStyle(button1);
  button1.disabled = true;
  disableButton(button2, button3);
  removeStyle(button2, button3);
};

var lunchEvent = function lunchEvent() {
  breakfast.style.display = 'none';
  lunch.style.display = 'block';
  dinner.style.display = 'none';
  addStyle(button2);
  disableButton(button1, button3);
  removeStyle(button1, button3);
  button2.disabled = true;
};

var dinnerEvent = function dinnerEvent() {
  breakfast.style.display = 'none';
  lunch.style.display = 'none';
  dinner.style.display = 'block';
  addStyle(button3);
  disableButton(button1, button2);
  button3.disabled = true;
  removeStyle(button1, button2);
};

// Event Listeners
button1.addEventListener('click', breakfastEvent);
button2.addEventListener('click', lunchEvent);
button3.addEventListener('click', dinnerEvent);

buttonOneDefault();