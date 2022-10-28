window.onload = function(e){
  
  fetch(`http://localhost:3000`)
  .then(res => res.json())
  .then(data =>{
    const { users } = data;
    
    console.log("users : ",users)
    appandInTable(users);
  }).catch((e)=>console.log(e))
}

const appandInTable = (users) =>{
  var tbody=document.getElementById('tbody');
  for(let i=0;i<users.length;i++){
    var tr=document.createElement("tr");
    var td1=document.createElement("td");
    var txt1=document.createTextNode(users[i]['firstName']);
    td1.appendChild(txt1);
    var td2=document.createElement("td");
    var txt2=document.createTextNode(users[i]['lastName']);
    td2.appendChild(txt2);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tbody.appendChild(tr);
  }
}

const addCSV=(e)=>{
  e.preventDefault()
  const input = document.getElementById('fileinput');
  console.log(input.files[0]);
  var formData = new FormData()
  formData.append('file', input.files[0])
  fetch('http://localhost:3000', {
    method: 'POST',
    body: formData
  }).then(res => res.json())
  .then(data => {
    const { message, users} = data;
    appandInTable(users);
    alert(message);
  })
  .catch((e)=>console.log(e))
}

document.getElementById('upload_form').addEventListener('submit',addCSV)
