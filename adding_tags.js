var arrPlace =[];
var arrActivity=[];


$(document).ready(function(){
    $("#add-place").click (function(){
        if ($('#place').val() !== ""){
            console.log($('#place').val());
            inputText = $('#place').val();
            arrPlace.push(inputText);
            $(this).parent().parent().parent().append(`<button type="tag" class="tag btn btn-primary btn-sm mt-2 mx-1 rounded-pill">${inputText}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x remove-tag" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg></button>`)
            $('#place').val("");
            
        }
    })

    $("#add-activity").click (function(){
        if ($('#activity').val() !== ""){
            console.log($('#activity').val());
            inputText = $('#activity').val();
            arrActivity.push(inputText);
            $(this).parent().parent().parent().append(`<button type="tag" class="tag btn btn-primary btn-sm mt-2 mx-1 rounded-pill">${inputText}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x remove-tag" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg></button>`)
            $('#activity').val("");
        }
        
    })
    
    $(document).on('click', '.remove-tag', function(e){
        if ($(e.target)[0].outerHTML.slice(1,5)==="path") $(e.target).parent().parent().remove();
        else $(e.target).parent().remove();
    })
})

