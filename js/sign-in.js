const dbData = [];
var userID, userPW;
const familyCode = '00AB8'

(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()
  
$(document).ready(function() {
  db.collection('users').get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
          dbData.push(doc.data())
        });
        console.log(dbData);
    });
})

$("#sign-in").click(()=>{
  userID = $("#userID").val();
  userPW = $("#userPW").val();
  var existID = false;
  for (var user of dbData) {
    if (user.id == userID) existID = true;
  }
  if (existID) alert('이미 존재하는 아이디입니다')
  else {
    /*
    db.collection('users').add({
      // family-code: familyCode,
      // family-id: 
      id: userID,
      pw: userPW
    })*/
    location.href = 'home.html';
  }
})