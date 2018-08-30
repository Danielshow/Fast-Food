let breakfast = document.getElementById('breakfast');
let lunch = document.getElementById('lunch');
let dinner = document.getElementById('dinner');

let button1= document.getElementById('button1')
let button2= document.getElementById('button2')
let button3= document.getElementById('button3')


button1.addEventListener('click', breakfastEvent)
button2.addEventListener('click', lunchEvent)
button3.addEventListener('click', dinnerEvent)

buttonOneDefault();

function breakfastEvent(){
  breakfast.style.display = "block";
  lunch.style.display = "none";
  dinner.style.display = "none";
  addStyle(button1)
  button1.disabled = true
  disableButton(button2, button3)
  removeStyle(button2, button3)
}

function lunchEvent(){
  breakfast.style.display = "none";
  lunch.style.display = "block";
  dinner.style.display = "none";
  addStyle(button2)
  disableButton(button1, button3)
  removeStyle(button1, button3)
  button2.disabled=true;
}

function dinnerEvent(){
  breakfast.style.display = "none";
  lunch.style.display = "none";
  dinner.style.display = "block";
  addStyle(button3)
  disableButton(button1, button2);
  button3.disabled = true;
  removeStyle(button1, button2)
}

//Helper functions
function addStyle(button){
  button.style.backgroundColor ="white";
  button.style.color="black";
}

function removeStyle(button1, button2){
  button1.style.backgroundColor = "rgb(224, 108, 65)";
  button1.style.color ="white";
  button2.style.backgroundColor = "rgb(224, 108, 65)";
  button2.style.color ="white";
}

function disableButton(button1, button2){
  button1.disabled = false;
  button2.disabled = false;
}

function buttonOneDefault(){
  button1.disabled = true;
  button1.style.backgroundColor = 'white';
  button1.style.color = 'black';
}
