const url = 'http://localhost:3000/api/v1';

fetch(`${url}/me`).then(data => data.json()).then(json =>{
  console.log(json);
})
