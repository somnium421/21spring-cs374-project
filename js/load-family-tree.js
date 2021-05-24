$("#submit-family-code").click (function(){
    if ($('#family-code-input').val() == ""){
        var text = `<small id="codeHelp" class="form-text" style="color: red">가족 코드를 입력해주세요. </small>`
        if ($("#codeHelp").length === 0) $("#family-code-input").parent().append(text);
        document.getElementById('family-code-input').style = "border: 2px solid #E8ADAA";
        return false;
    }
    else{
        $("#codeHelp").remove();
        document.getElementById('family-code-input').style = "border: ''";
        location.href = "assign.html" 
    }
})