const input = document.getElementById('myInput');
const table = document.querySelector('table');
const btn = document.getElementsByClassName('btn');

const order={};

if (document.addEventListener){
  document.addEventListener('click', getFoodsFromClick)
}

function getFoodsFromClick(e){
  if (e.target.parentNode && e.target.parentNode.nodeName == 'H4'){
    choice = confirm(`Are you sure you want to Order ${e.target.parentNode.innerText}`);
    if (choice){
      const [food, price] = e.target.parentNode.innerText.split('\n');
      order[food] = price;
      console.log(order);
    }else{
      console.log('no deal');
    }
  }
}

input.addEventListener('keyup', searchFunction);

function searchFunction() {
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
}
