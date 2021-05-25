localStorage.removeItem("family-code");
localStorage.removeItem("family-id");

const dbData = [];
var userID, userPW;
// const familyCode = '00AB8'

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

$("#sign-in").click(async function() {
  userID = $("#userID").val();
  userPW = $("#userPW").val();
  var existID = false;
  if (userID==''){
    document.getElementById('userID').style = "border: 2px solid #E8ADAA";
    document.getElementById('userPW').style = "border: ''";
    var text = `<small id="signinHelp" class="form-text" style="color: red">생성할 아이디를 입력해주세요.</small>`
    if ($("#signinHelp").length === 0) $("#userPW").parent().append(text);
    else {
        $("#signinHelp").remove();
        $("#userPW").parent().append(text);}
    return;
  }
  else if(userPW==''){
    document.getElementById('userID').style = "border: 2px solid #E8ADAA";
    document.getElementById('userPW').style = "border: ''";
    var text = `<small id="signinHelp" class="form-text" style="color: red">생성할 비밀번호를 입력해주세요.</small>`
    if ($("#signinHelp").length === 0) $("#userPW").parent().append(text);
    else {
        $("#signinHelp").remove();
        $("#userPW").parent().append(text);}
    return;
  }
  else if (userPW.length < 8){
    document.getElementById('userPW').style = "border: 2px solid #E8ADAA";
    document.getElementById('userID').style = "border: ''";
    var text = `<small id="signinHelp" class="form-text" style="color: red">8자리 이상의 비밀번호를 만들어주세요.</small>`
    if ($("#signinHelp").length === 0) $("#userPW").parent().append(text);
    else {
        $("#signinHelp").remove();
        $("#userPW").parent().append(text);}
    return;
  }
  else if (userPW.length > 21){
    document.getElementById('userPW').style = "border: 2px solid #E8ADAA";
    document.getElementById('userID').style = "border: ''";
    var text = `<small id="signinHelp" class="form-text" style="color: red">20자리 이하의 비밀번호를 만들어주세요.</small>`
    if ($("#signinHelp").length === 0) $("#userPW").parent().append(text);
    else {
        $("#signinHelp").remove();
        $("#userPW").parent().append(text);}
    return;
  }

  for (var user of dbData) {
    if (user.id == userID) existID = true;
  }
  if (existID) {
    //alert('이미 존재하는 아이디입니다')
    document.getElementById('userID').style = "border: 2px solid #E8ADAA";
    document.getElementById('userPW').style = "border: ''";
    var text = `<small id="signinHelp" class="form-text" style="color: red">이미 존재하는 아이디입니다</small>`
    if ($("#signinHelp").length === 0) $("#userPW").parent().append(text);
    else {
        $("#signinHelp").remove();
        $("#userPW").parent().append(text);}
    return;
  }
  else {
    document.getElementById('userID').style = "border: ''";
    document.getElementById('userPW').style = "border: ''";
    $("#signinHelp").remove();
    localStorage.setItem('id', userID);
    localStorage.setItem('pw', userPW);
    
    await db.collection('users').add({
      // family-code: familyCode,
      // family-id: 
      id: userID,
      pw: userPW
    })
    location.href = 'home.html';
  }
})