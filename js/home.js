var select_id;
db.collection('families').where('code', '==', localStorage.getItem("family-code"))
.get()
.then((snapshot) => {
    snapshot.forEach((doc) => {
        docID = doc.id;
        members = doc.data().members;
        for (var member of members) {
            var tag = ` <div>
        <img src="${member.img}" style="width:30px;height:30px;border-radius:70%;margin-bottom:12px;"></img><button class = "btn" onclick = "select_account(${member.id})">&nbsp;&nbsp;&nbsp${member.name}</button>
   </div>`;
            $("#change-account-tree").append(tag);
        }
        for (var member of members) {
            if (member.id == localStorage.getItem('family-id')) {
                $('#user-name').text(member.name);
                $('#user-img').attr('src', member.img);
                console.log("nav: " + member.name);
                localStorage.setItem('family-id', member.id);
                localStorage.setItem('img', member.img);
                localStorage.setItem('name', member.name);
               
            }
        }


    })

})



function change_account(){
    localStorage.setItem('real-family-id', localStorage.getItem('family-id'));
    localStorage.setItem('family-id', select_id);        
    console.log("id is changed");     
    location.reload();                           
    
}

function select_account(id){
    console.log("clicked");
    select_id = id;
    
}

function turn_to_origin(){
    document.getElementById("change_account_button").style.display = "block"
    document.getElementById("turn_to_origin").style.display = "none"
    console.log("원래계정으로 돌아갑니다.")
    localStorage.setItem('family-id', localStorage.getItem('real-family-id'));        
    localStorage.removeItem('real-family-id');
    console.log("original id is :"+localStorage.getItem('family-id'));
    console.log("user name is_original" + userName);
    location.reload();

    
}

if(localStorage.getItem('real-family-id')){

    document.getElementById("change_account_button").style.display = "none"
    document.getElementById("turn_to_origin").style.display = "block"
    console.log("계정이 전환된 상태입니다.")
    console.log("changed id is :"+localStorage.getItem('family-id'));
    console.log("original id is :"+localStorage.getItem('real-family-id'));
    console.log("user name is " + userName);
}