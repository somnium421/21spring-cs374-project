const dbData = [];

$(document).ready(function() {
    db.collection('families').get()
      .then((snapshot) => {
          snapshot.forEach((doc) => {
            dbData.push(doc.data());
          });
          console.log(dbData);
      });
  })

$("#submit-family-code").click (function(){
    familyCodeId = $('#family-code-input').val()
    if ( familyCodeId== ""){
        var text = `<small id="codeHelp" class="form-text" style="color: red">가족 코드를 입력해주세요. </small>`
        if ($("#codeHelp").length === 0) $("#family-code-input").parent().append(text);
        document.getElementById('family-code-input').style = "border: 2px solid #E8ADAA";
        return false;
    }

    for (var family of dbData) {
        console.log(family.code);
        if (family.code == familyCodeId){
            $("#codeHelp").remove();
            document.getElementById('family-code-input').style = "border: ''";
            //family.code local 에 올리기
            //localStorage.setItem(family-code,family.code);
            location.href = "assign.html"
        }
    }
    var text = `<small id="codeHelp" class="form-text" style="color: red">없는 가족코드입니다. 다시 입력해주세요. </small>`
    if ($("#codeHelp").length === 0) $("#family-code-input").parent().append(text);
    document.getElementById('family-code-input').style = "border: 2px solid #E8ADAA";
    return false;
})