user = document.getElementById('users')
order = document.getElementById('order')
payment_made = document.getElementById('payment_made')
paymentbtn = document.getElementById('payment-click')
orderbtn = document.getElementById('order_click')
people=document.getElementById('people')
addFood = document.getElementById('add-food');
addbtn = document.getElementById('message')

// Add Food input
textInp = document.getElementById('textInp')
priceInp = document.getElementById('priceInp')
actionbtn = document.getElementById('action')
myTable = document.getElementById('myTable2')

//Add food input Event
textInp.addEventListener('input', add);
priceInp.addEventListener('input', add)
actionbtn.addEventListener('click', actionAdd)

// Click Event
users.addEventListener('click', clickEvent)
orderbtn.addEventListener('click', orderEvent)
paymentbtn.addEventListener('click', paymentEvent)
addbtn.addEventListener('click', addEvent)



function clickEvent(){
    people.style.display ="block"
    order.style.display="none";
    payment_made.style.display ="none";
    addFood.style.display ="none";
}

function orderEvent(){
  order.style.display="block";
  people.style.display ="none"
  payment_made.style.display ="none";
  addFood.style.display ="none";
}

function paymentEvent(){
  payment_made.style.display ="block";
  order.style.display="none";
  people.style.display="none"
  addFood.style.display ="none";
}

function addEvent(){
  addFood.style.display ="block";
  order.style.display="none";
  people.style.display="none"
  payment_made.style.display ="none";
}

function add(e){

}

function actionAdd(){
  console.log(myTable);
  myTable.innerHTML += `<tr> <td> ${textInp.value} </td><td> ${priceInp.value} </td><td><button type="button" name="button" class="danger">X</button></td></tr>`

}
