const dbIDPW = [];
var userID, userPw;

$(document).ready(function(){
    db.collection('users').get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            dbIDPW.push({
                id: doc.data().id,
                pw: doc.data().pw
            })
        });
        console.log(dbIDPW);
    });
})

$('#login').click(() => {
    userId = $("#userId").val();
    userPw = $("#userPw").val();
    userID = 'hyehye';
})
