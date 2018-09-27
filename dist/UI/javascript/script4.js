'use strict';

var url = 'http://localhost:3000/api/v1';

fetch(url + '/me').then(function (data) {
  return data.json();
}).then(function (json) {
  console.log(json);
});