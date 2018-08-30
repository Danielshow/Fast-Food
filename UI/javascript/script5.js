user = document.getElementById('users')
order = document.getElementById('order')
payment_made = document.getElementById('payment_made')
paymentbtn = document.getElementById('payment-click')
orderbtn = document.getElementById('order_click')
people=document.getElementById('people')

users.addEventListener('click', clickEvent)
orderbtn.addEventListener('click', orderEvent)
paymentbtn.addEventListener('click', paymentEvent)


function clickEvent(){
    people.style.display ="block"
    order.style.display="none";
    payment_made.style.display ="none";
}

function orderEvent(){
  order.style.display="block";
  people.style.display ="none"
  payment_made.style.display ="none";
}

function paymentEvent(){
  payment_made.style.display ="block";
  order.style.display="none";
  people.style.display="none"
}
