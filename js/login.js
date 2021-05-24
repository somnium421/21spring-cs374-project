const dbData = [];
var userID, userPw;
storage = window.localStorage;

$(document).ready(function(){
    db.collection('users').get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            dbData.push(doc.data());
        });
    });
})

$('#login').click(() => {
    userID = $("#userID").val();
    userPW = $("#userPW").val();
    console.log(userID, userPW);
    if (userID == '' || userPW == '') {
        alert('빈칸을 모두 입력해주세요')
    }
    else {
        var noSuchID = true;
        for (var user of dbData) {
            console.log(user);
            if (user.id == userID) {
                noSuchID = false;
                if (user.pw == userPW) {
                    localStorage.setItem('family-code', user["family-code"]);
                    localStorage.setItem('family-id', user["family-id"]);
                    localStorage.setItem('id', user["id"]);
                    localStorage.setItem('pw', user["pw"]);
                    location.href = 'home.html';
                }
                else {
                    $('#userPW').val('')
                    alert('비밀번호가 틀렸습니다. 다시 입력해주세요')
                }
            }
        }
        if (noSuchID) {
            $('#userID').val('')
            $('#userPW').val('')
            alert('존재하지 않는 아이디입니다. 다시 입력해주세요')
        }
    }
})
