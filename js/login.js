const dbData = [];
var userID, userPw;
storage = window.localStorage;

$(document).ready(function(){
    localStorage.removeItem('family-code');
    localStorage.removeItem('familyCode');
    localStorage.removeItem('family-id');
    localStorage.removeItem('familyID');
    localStorage.removeItem('id');
    localStorage.removeItem('userID');
    localStorage.removeItem('pw');

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
    if (userID == '' && userPW == '') {
        document.getElementById('userID').style = "border: 2px solid #E8ADAA";
        document.getElementById('userPW').style = "border: 2px solid #E8ADAA";
        var text = `<small id="loginHelp" class="form-text" style="color: red">아이디와 비밀번호를 입력해주세요.</small>`
        if ($("#loginHelp").length === 0) $("#userPW").parent().append(text);
        else {
            $("#loginHelp").remove();
            $("#userPW").parent().append(text);}
    }
    else if(userID == ''){
        document.getElementById('userID').style = "border: 2px solid #E8ADAA";
        document.getElementById('userPW').style = "border: ''";
        var text = `<small id="loginHelp" class="form-text" style="color: red">아이디를 입력해주세요.</small>`
        if ($("#loginHelp").length === 0) $("#userPW").parent().append(text);
        else {
            $("#loginHelp").remove();
            $("#userPW").parent().append(text);}
    }
    else if (userPW == ''){
        document.getElementById('userID').style = "border: ''";
        document.getElementById('userPW').style = "border: 2px solid #E8ADAA";
        var text = `<small id="loginHelp" class="form-text" style="color: red">비밀번호를 입력해주세요.</small>`
        if ($("#loginHelp").length === 0) $("#userPW").parent().append(text);
        else {
            $("#loginHelp").remove();
            $("#userPW").parent().append(text);}
    }
    else {
        document.getElementById('userID').style = "border: ''";
        document.getElementById('userPW').style = "border: ''";
        $("#loginHelp").remove();

        var noSuchID = true;
        for (var user of dbData) {
            console.log(user);
            if (user.id == userID) {
                noSuchID = false;
                if (user.pw == userPW) {
                    console.log(user);
                    document.getElementById('userID').style = "border: ''";
                    document.getElementById('userPW').style = "border: ''";
                    localStorage.setItem('family-code', user["family-code"]);
                    localStorage.setItem('family-id', user["family-id"]);
                    localStorage.setItem('id', user["id"]);
                    localStorage.setItem('pw', user["pw"]);
                    location.href = 'home.html';
                }
                else {
                    $('#userPW').val('')
                    //alert('비밀번호가 틀렸습니다. 다시 입력해주세요')
                    document.getElementById('userPW').style = "border: 2px solid #E8ADAA";
                    var text = `<small id="loginHelp" class="form-text" style="color: red">비밀번호가 틀렸습니다. 다시 입력해주세요</small>`
                    if ($("#loginHelp").length === 0) $("#userPW").parent().append(text);
                    else {
                        $("#loginHelp").remove();
                        $("#userPW").parent().append(text);
                    }
                }
            }
        }
        if (noSuchID) {
            $('#userID').val('')
            $('#userPW').val('')
            //alert('존재하지 않는 아이디입니다. 다시 입력해주세요')
            document.getElementById('userID').style = "border: 2px solid #E8ADAA";
            var text = `<small id="loginHelp" class="form-text" style="color: red">존재하지 않는 아이디입니다.다시 입력해주세요</small>`
            if ($("#loginHelp").length === 0) $("#userPW").parent().append(text);
            else {
                $("#loginHelp").remove();
                $("#userPW").parent().append(text);
            }
        }
    }
})
