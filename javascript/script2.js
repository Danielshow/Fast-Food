input = document.getElementById('myInput')

input.addEventListener('keyup', searchFunction);

function searchFunction(){
  table = document.getElementById('myTable')
  tr = table.getElementsByTagName('tr')

  for (let i=0; i<tr.length; i++){
    td = tr[i].getElementsByTagName('td')[0];
    if (td){
      if (td.innerHTML.toLowerCase().indexOf(input.value.toLowerCase()) > -1){
        tr[i].style.display = "";
      }else{
        tr[i].style.display = "none";
      }
    }
  }
}
