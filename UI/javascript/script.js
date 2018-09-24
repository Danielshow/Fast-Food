const breakfast = document.getElementById('breakfast');
const lunch = document.getElementById('lunch');
const dinner = document.getElementById('dinner');
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');

// Helper functions
addStyle = ((button) => {
  button.style.backgroundColor = 'white';
  button.style.color = 'black';
})

removeStyle = ((button1, button2) => {
  button1.style.backgroundColor = 'rgb(224, 108, 65)';
  button1.style.color = 'white';
  button2.style.backgroundColor = 'rgb(224, 108, 65)';
  button2.style.color = 'white';
})

disableButton = ((button1, button2) => {
  button1.disabled = false;
  button2.disabled = false;
})

buttonOneDefault = (() => {
  button1.disabled = true;
  button1.style.backgroundColor = 'white';
  button1.style.color = 'black';
})

breakfastEvent = (() => {
  breakfast.style.display = 'block';
  lunch.style.display = 'none';
  dinner.style.display = 'none';
  addStyle(button1);
  button1.disabled = true;
  disableButton(button2, button3);
  removeStyle(button2, button3);
})

lunchEvent = (() => {
  breakfast.style.display = 'none';
  lunch.style.display = 'block';
  dinner.style.display = 'none';
  addStyle(button2);
  disableButton(button1, button3);
  removeStyle(button1, button3);
  button2.disabled = true;
})

dinnerEvent = (() => {
  breakfast.style.display = 'none';
  lunch.style.display = 'none';
  dinner.style.display = 'block';
  addStyle(button3);
  disableButton(button1, button2);
  button3.disabled = true;
  removeStyle(button1, button2);
})

// Event Listeners
button1.addEventListener('click', breakfastEvent);
button2.addEventListener('click', lunchEvent);
button3.addEventListener('click', dinnerEvent);

buttonOneDefault();
