'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var input = document.getElementById('myInput');
var foodItems = document.getElementById('foodItems');
var deleteOrder = document.getElementById('delete');
var orderFood = document.getElementById('orderfood');

var getFoodsFromClick = function getFoodsFromClick(e) {
  if (e.target.parentNode && e.target.parentNode.nodeName === 'H4') {
    var _e$target$parentNode$ = e.target.parentNode.innerText.split('\n'),
        _e$target$parentNode$2 = _slicedToArray(_e$target$parentNode$, 2),
        food = _e$target$parentNode$2[0],
        price = _e$target$parentNode$2[1];

    foodItems.innerHTML += '<li> ' + food + ' ' + price + ' <a href="#" id="delete"> Delete </a> <br></li>';
  } else if (e.target.parentNode && e.target.parentNode.nodeName === 'LI') {
    var foodList = orderFood.getElementsByTagName('li');
    foodList = Array.from(foodList).filter(function (x) {
      return x !== e.target.parentNode;
    });
    foodItems.innerHTML = '';
    for (var i = 0; i < foodList.length; i += 1) {
      foodItems.innerHTML += '<li> ' + foodList[i].innerHTML + ' </li>';
    }
  }
};

var searchFunction = function searchFunction() {
  var dishes = document.getElementsByClassName('col');
  for (var i = 0; i < dishes.length; i += 1) {
    var td = dishes[i];
    if (td) {
      if (td.innerText.toLowerCase().indexOf(input.value.toLowerCase()) > -1) {
        td.style.display = '';
      } else {
        td.style.display = 'none';
      }
    }
  }
};

input.addEventListener('keyup', searchFunction);
if (document.addEventListener) {
  document.addEventListener('click', getFoodsFromClick);
}