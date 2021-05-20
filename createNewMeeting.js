import {participans_transfer} from './participants_transfer.js'

//This is for new meeting creation page

console.log("hello world")

$("#Txt_Date").datepicker({
    format: 'd-M-yyyy',
    inline: false,
    lang: 'en',
    step: 10,
    multidate: true,
    closeOnDateSelect: true,
    todayHighlight: false
});

var navListItems = $('div.setup-panel div a'),
    allWells = $('.setup-content'),
    allNextBtn = $('.nextBtn'),
    allPrevBtn = $('.prevBtn');

    allWells.hide();

navListItems.click(function (e) {
    e.preventDefault();
    var $target = $($(this).attr('href')),
        $item = $(this);

    if (!$item.hasClass('disabled')) {
        navListItems.removeClass('btn-light').addClass('btn-primary');
        $item.addClass('btn-light');
        allWells.hide();
        $target.show();
        $target.find('input:eq(0)').focus();
    }
});

allPrevBtn.click(function(){
    var curStep = $(this).closest(".setup-content"),
        curStepBtn = curStep.attr("id"),
        prevStepSteps = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().prev().children("a");

        prevStepSteps.removeAttr('disabled').trigger('click');
});

allNextBtn.click(function(){
    var curStep = $(this).closest(".setup-content"),
        curStepBtn = curStep.attr("id"),
        nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
        curInputs = curStep.find("input[type='text'],input[type='url']"),
        isValid = true;

    $(".form-group").removeClass("has-error");
    for(var i=0; i< curInputs.length; i++){
        if (!curInputs[i].validity.valid){
            isValid = false;
            $(curInputs[i]).closest(".form-group").addClass("has-error");
        }
    }

    if (isValid)
        nextStepWizard.removeAttr('disabled').trigger('click');
});

$('div.setup-panel div a.btn-light').trigger('click');

var db_period

//일, 시간, 분 input 고르기
$('.timefield').removeAttr('disabled');
   
$('.timefield').change(function(){
   
    var day = $('#day').val();
    var hour = $('#hour').val();
    var min = $('#min').val();

    var textForDays = `<small id="periodHelp" class="form-text text-muted">${Number(day)-1}박 ${Number(day)}일 동안 모임을 진행합니다.</small>`
    var textForADay = `<small id="periodHelp" class="form-text text-muted">하루종일 모임을 진행합니다.</small>`
    var text;

    if((day) > 0){
        $('#hour').attr('disabled','disabled');
        $('#min').attr('disabled','disabled');
        if (day === "1") {
            text = textForADay;
        }else {
            text = textForDays;
        }
        
        if ($("#periodHelp").length === 0) $("#period-select").append(text);
        else $("#periodHelp").replaceWith(text);
    }

    else if((hour) > 0){
        if ($("#periodHelp").length !== 0) $("#periodHelp").hide();
        $('#day').attr('disabled','disabled');
    }
    else if((min) > 0){
        if ($("#periodHelp").length !== 0) $("#periodHelp").hide();
        $('#day').attr('disabled','disabled');
    }
    else{
        if ($("#periodHelp").length !== 0) $("#periodHelp").hide();
        $('#day').removeAttr('disabled');
        $('#hour').removeAttr('disabled');
        $('#min').removeAttr('disabled');
    }

    db_period = {day: Number(day), hr: Number(hour), min: Number(min)};
});



var db_log_newMeeting={};

var arrPlace = [];
var arrActivity = [];

//$('#surveyPeriod').val();
$('#meetingPrivacy').click(function(){
    console.log($('#meetingPrivacy').prop('checked'));
});



$("#add-place").click (function(e){
    e.preventDefault();
    if ($('#place').val() !== ""){
        console.log($('#place').val());
        var inputText = $('#place').val();
        arrPlace.push(inputText);
        $(this).parent().parent().parent().append(`<button type="tag" class="tag btn btn-primary btn-sm mt-2 mx-1 rounded-pill">${inputText}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x remove-tag" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg></button>`)
        $('#place').val("");
    }
})

$("#add-activity").click (function(e){
    e.preventDefault();
    if ($('#activity').val() !== ""){
        console.log($('#activity').val());
        var inputText = $('#activity').val();
        arrActivity.push(inputText);
        $(this).parent().parent().parent().append(`<button type="tag" class="tag btn btn-primary btn-sm mt-2 mx-1 rounded-pill">${inputText}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x remove-tag" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg></button>`)
        $('#activity').val("");
    }
    
})

$(document).on('click', '.remove-tag', function(e){
    e.preventDefault();
    if ($(e.target)[0].outerHTML.slice(1,5)==="path") $(e.target).parent().parent().remove();
    else $(e.target).parent().remove();
})




// $('#step1-submit').click(function(){
//     db_log_newMeeting.name = $('#meeting-name').val();
//     db_log_newMeeting.description = $('#meeting-description').val();
// })

// $('#step2-submit').click(function(){
//     db_log_newMeeting.participants = participans_transfer.getSelectedItems();
// })

// $('#step3-submit').click(function(){
//     db_log_newMeeting.place = arrPlace;
//     db_log_newMeeting.noMorePlace = $('#place-recommend').is(':checked');
//     db_log_newMeeting.activity = arrActivity;
//     db_log_newMeeting.noMoreActivity = $('#activity-recommend').is(':checked');

// })

// $('#step4-submit').click(function(){
//     db_log_newMeeting.meetingPeriod = db_period;
//     db_log_newMeeting.availableDates = [];
//     db_log_newMeeting.availableTimes = [];
// })

$('#final-submit').click(function(){
    db_log_newMeeting.name = $('#meeting-name').val();
    db_log_newMeeting.description = $('#meeting-description').val();

    db_log_newMeeting.participants = participans_transfer.getSelectedItems();

    db_log_newMeeting.place = arrPlace;
    db_log_newMeeting.noMorePlace = $('#place-recommend').is(':checked');
    db_log_newMeeting.activity = arrActivity;
    db_log_newMeeting.noMoreActivity = $('#activity-recommend').is(':checked');

    db_log_newMeeting.meetingPeriod = db_period;
    db_log_newMeeting.availableDates = []; // I don't know well
    db_log_newMeeting.availableTimes = [];

    db_log_newMeeting.surveyPeriod = Number($('#surveyPeriod').val());
    db_log_newMeeting.isPrivate = $('#btnradio2').is(':checked');
    
    db_log_newMeeting.chat = {};

    db_log_newMeeting.isEnd = false;
    console.log(db_log_newMeeting);


    db.collection('families').doc().set({
        code: "00AB8",
        meetings: [db_log_newMeeting],
        members: []
    })
})
