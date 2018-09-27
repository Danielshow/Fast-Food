'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var input = document.getElementById('myInput');
var table = document.querySelector('table');
var btn = document.getElementsByClassName('btn');
input.addEventListener('keyup', searchFunction);

var order = {};

if (document.addEventListener) {
  document.addEventListener('click', getFoodsFromClick);
}

getFoodsFromClick = function getFoodsFromClick(e) {
  if (e.target.parentNode && e.target.parentNode.nodeName == 'H4') {
    choice = confirm('Are you sure you want to Order ' + e.target.parentNode.innerText);
    if (choice) {
      var _e$target$parentNode$ = e.target.parentNode.innerText.split('\n'),
          _e$target$parentNode$2 = _slicedToArray(_e$target$parentNode$, 2),
          food = _e$target$parentNode$2[0],
          price = _e$target$parentNode$2[1];

      order[food] = price;
      console.log(order);
    } else {
      console.log('no deal');
    }
  }
};

searchFunction = function searchFunction() {
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