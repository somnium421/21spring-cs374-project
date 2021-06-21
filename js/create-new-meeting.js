// import {participants_transfer} from './js/participants-transfer.js'
// //This is for new meeting creation page

const familyCode = localStorage.getItem("family-code"); // from the local storage
const userID = Number(localStorage.getItem("family-id"));// from the local storage
var userImg = localStorage.getItem('img');
var userName = localStorage.getItem('name');
var imgDrawn = false;

if (userImg !== undefined && userImg !== null && userImg !== 'undefined' && userImg !== ""){
    $('#user-name').text(userName);
    $('#user-img').attr('src', userImg);
    imgDrawn = true;
}
var availableTime = [];
var availableDates = [];
lang = localStorage.getItem('lang');

if(lang == 'en'){
    $('#meeting-name').attr('placeholder',  `Title of the meeting`);
    $('#place').attr('placeholder',  `Where would you like to go? Add tags`);
    $('#activity').attr('placeholder',  `What would you like to do? Add tags`);
    $('#start-time').attr('placeholder',  `Please select`);
}

$("#Txt_Date").datepicker({
    format: 'd-M-yyyy',
    inline: false,
    lang: 'en',
    step: 10,
    multidate: true,
    closeOnDateSelect: true,
    todayHighlight: false
}).on("changeDate", function(e) {

    
    var res = e.dates.map((el) => new Date(el).getTime())
                    .sort()
                    .map((el) => new Date(el));
    
    // e.dates.sort((a,b) => {
    //     if (new Date(a).getTime() < new Date(b).getTime()) return 1 ;
    //     else if (new Date(a).getTime < new Date(b).getTime()) return -1 ;
    //     else return 0 ;
    // });
    console.log(res);
    availableDates = e.dates.map((el) => new Date(el).getTime())
                            .sort()
                            .map((el) => new Date(el));
});

function validateinput(id){
    if (!$("#"+id).val()){
        var text = `<small id="`+id+`Help" class="form-text" style="color: red">필수입력 사항입니다. </small>`
        if ($("#"+id+"Help").length === 0) $("#"+id).parent().append(text);
        document.getElementById(id).style = "border: 2px solid #E8ADAA";
        return false;
    }
    $("#"+id+"Help").remove();
    document.getElementById(id).style = "border: ''";
    return true;
}

function validatenums(id){
    if (!$("#"+id).val()){
        var text = `<small id="`+id+`Help" class="form-text" style="color: red">필수입력 사항입니다. </small>`
        if ($("#"+id+"Help").length === 0) $("#"+id).parent().parent().append(text);
        else $("#"+id+"Help").replaceWith(text);
        document.getElementById(id).style = "border: 2px solid #E8ADAA";
        return false;
    }
    else if ($("#"+id).val()==0){
        var text = `<small id="`+id+`Help" class="form-text" style="color: red">0이 아닌 숫자를 입력해주세요. </small>`
        if ($("#"+id+"Help").length === 0) $("#"+id).parent().parent().append(text);
        else $("#"+id+"Help").replaceWith(text);
        document.getElementById(id).style = "border: 2px solid #E8ADAA";
        return false;
    }
    $("#"+id+"Help").remove();
    document.getElementById(id).style = "border: ''";
    return true;
}

function validateperiod(){
    if (!$("#day").val() && !$("#hour").val()){
        var text = `<small id="periodsHelp" class="form-text" style="color: red">필수입력 사항입니다. </small>`
        if ($("#periodsHelp").length === 0) $("#day").parent().parent().append(text);
        else $("#periodsHelp").replaceWith(text);
        document.getElementById("day").style = "border: 2px solid #E8ADAA";
        document.getElementById("hour").style = "border: 2px solid #E8ADAA";
        return false;
    }
    else if ($("#day").val()==0 && $("#hour").val()==0){
        var text = `<small id="periodsHelp" class="form-text" style="color: red">0이 아닌 숫자를 입력해주세요. </small>`
        if ($("#periodsHelp").length === 0) $("#day").parent().parent().append(text);
        else $("#periodsHelp").replaceWith(text);
        document.getElementById("day").style = "border: 2px solid #E8ADAA";
        document.getElementById("hour").style = "border: 2px solid #E8ADAA";
        return false;
    }
    $("#periodsHelp").remove();
    document.getElementById("day").style = "border: ''";
    document.getElementById("hour").style = "border: ''";
    return true;
}

function validateparticipants(){
    if (participants_transfer.getSelectedItems().length ==0){
        var text = `<small id="participantsHelp" class="form-text" style="color: red">필수입력 사항입니다. </small>`
        if ($("#participantsHelp").length === 0) $("#participants-transfer").append(text);        
        return false;
    }
    $("#participantsHelp").remove();
    return true;
}

function validatearr(id, arr, len){
    if (arr.length != len){
        $("#"+id+"Help").remove();
        document.getElementById(id).style = "border: ''";
        return true; 
    }
    var text = `<small id="`+id+`Help" class="form-text" style="color: red">필수입력 사항입니다. </small>`
    if ($("#"+id+"Help").length === 0) $("#"+id).parent().parent().append(text);
    document.getElementById(id).style = "border: 2px solid #E8ADAA";
    return false;
}
function validatearr2(id, arr, len){
    if (arr.length != len){
        $("#"+id+"Help").remove();
        return true; 
    }
    var text = `<small id="`+id+`Help" class="form-text" style="color: red">필수입력 사항입니다. </small>`
    if ($("#"+id+"Help").length === 0) $("#"+id).parent().append(text);
    return false;
}
function validatearr3(id, arr, len){
    if (arr.length == len){
        $("#"+id+"Help").remove();
        document.getElementById(id).style = "border: ''";
        return true; 
    }
    else if($("#day").val()> 0){
        console.log("여기로 나와야 함");
        $("#"+id+"Help").remove();
        $('.mbsc-textfield').css('background', 'rgb(233, 233, 233)');

        document.getElementById(id).style = "border: ''";
        return true; 
    }
    else if (arr.length == 0){
        var text = `<small id="`+id+`Help" class="form-text" style="color: red">필수입력 사항입니다. </small>`
        if ($("#"+id+"Help").length === 0) $("#available-time-form").append(text);
        else $("#"+id+"Help").replaceWith(text);
        document.getElementById(id).style = "border: 2px solid #E8ADAA";
        return false;
    }
    else{
        var text = `<small id="`+id+`Help" class="form-text" style="color: red">시작하는 시간과 끝나는 시간을 모두 입력하세요. </small>`
        if ($("#"+id+"Help").length === 0) $("#available-time-form").append(text);
        else $("#"+id+"Help").replaceWith(text);
        document.getElementById(id).style = "border: 2px solid #E8ADAA";
        return false;
    }
}

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
    curId = $(this).attr('id');
    //validation
    switch(curId) {
        case 'step1-submit':
            var a = validateinput('meeting-name');
            var b = validateinput('meeting-description');
            if (a && b){
                break;
            }
            return;

        case 'step2-submit':
            if (validateparticipants()){
                break;
            }
            return;

        case 'step3-submit':
            var a= validatearr('place', arrPlace, 0);
            var b= validatearr('activity', arrActivity, 0);
            if (a && b){
                break;
            }
            return;
        case 'step4-submit':
            var a = validateperiod();
            var b = validatearr2('Txt_Date', availableDates, 0);
            var c = validatearr3('start-time', $('#start-time').val(), 19);
            
            if(a && b && c) break;
            return;
        default:
            break;
    }
    console.log('hi');

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

    console.log(day)

    if((day) > 0){
        document.getElementById("day").style = "border: ''";
        document.getElementById("hour").style = "border: ''";
        $("#periodsHelp").remove();
        $("#start-timeHelp").remove();

        $('#hour').attr('disabled','disabled');
        $('#min').attr('disabled','disabled');
        if (day === "1") {
            text = textForADay;
        }else {
            text = textForDays;
        }
        
        if ($("#periodHelp").length === 0) $("#period-select").append(text);
        else $("#periodHelp").replaceWith(text);
        
        $('#start-time').attr('disabled', true);
        $('#start-time').removeAttr('placeholder');
        $('.mbsc-textfield').css('background', 'rgb(233, 233, 233)');
        
    }
    else if((hour) > 0){
        document.getElementById("day").style = "border: ''";
        document.getElementById("hour").style = "border: ''";
        $("#periodsHelp").remove();

        if ($("#periodHelp").length !== 0) $("#periodHelp").hide();
        $('#day').attr('disabled','disabled');
        
        $('#start-time').removeAttr('disabled');
        $('#start-time').attr('placeholder', "선택해 주세요");
        $('.mbsc-textfield').css('background', '#fff');
    }
    // else if((min) > 0){
    //     if ($("#periodHelp").length !== 0) $("#periodHelp").hide();
    //     $('#day').attr('disabled','disabled');
    //     $('#start-time').removeAttr('disabled');
    // }
    else{
        if ($("#periodHelp").length !== 0) $("#periodHelp").hide();
        $('#day').removeAttr('disabled');
        $('#hour').removeAttr('disabled');
        $('#min').removeAttr('disabled');

        $('#start-time').removeAttr('disabled');
        $('#start-time').attr('placeholder', "선택해 주세요");
        $('.mbsc-textfield').css('background', '#fff');
    }
    // db_period = {day: Number(day), hr: Number(hour), min: Number(min)};
    db_period = {day: Number(day), hr: Number(hour)};
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
        //for validation removed style
        $("#placeHelp").remove();
        document.getElementById("place").style = "border: ''";

        console.log($('#place').val());
        var inputText = $('#place').val();
        arrPlace.push(inputText);
        $(this).parent().parent().parent().append(`<button type="tag" class="tag-place btn btn-primary btn-sm mt-2 mx-1 rounded-pill"><span class= '${inputText}' >${inputText}</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x remove-tag" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg></button>`)
        $('#place').val("");
    }
})

$("#add-activity").click (function(e){
    e.preventDefault();
    if ($('#activity').val() !== ""){
        //for validation removed style
        $("#activityHelp").remove();
        document.getElementById("activity").style = "border: ''";

        console.log($('#activity').val());
        var inputText = $('#activity').val();
        arrActivity.push(inputText);
        $(this).parent().parent().parent().append(`<button type="tag" class="tag-activity btn btn-primary btn-sm mt-2 mx-1 rounded-pill"><span class = '${inputText}'>${inputText}</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x remove-tag" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg></button>`)
        $('#activity').val("");
    }
    
})

$(document).on('click', '.remove-tag', function(e){
    e.preventDefault();
    if ($(e.target)[0].outerHTML.slice(1,5)==="path") {
        if ($(e.target).parent().parent().hasClass('tag-place')) arrPlace = arrPlace.filter((el) => el !== $(e.target).parent().prev().attr('class'));
        else arrActivity = arrActivity.filter((el) => el !== $(e.target).parent().prev().attr('class'));
        $(e.target).parent().parent().remove();
    }
    else {
        if ($(e.target).parent().hasClass('tag-place')) arrPlace = arrPlace.filter((el) => el !== $(e.target).prev().attr('class'));
        else arrActivity = arrActivity.filter((el) => el !== $(e.target).prev().attr('class'));
        $(e.target).parent().remove();
    }
})


// var familyChart = [
//     { id: 0, tags: ["blue"], partner: 1, name: "정창식", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg"},
//     { id: 1, pid: 0, tags: ["partner"], partner: 0, name: "김영구", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 2, pid: 0, ppid: 1, tags: ["default"], partner: 3, name: "정경택", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 3, pid: 2, tags: ["partner"], partner: 2, name: "김효인", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 4, pid: 0, ppid: 1, tags: ["default"], partner: 5, name: "정미영", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 5, pid: 4, tags: ["partner"], partner: 4, name: "김종욱", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 6, pid: 0, ppid: 1, tags: ["default"], partner: 7, name: "정경남", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 7, pid: 6, tags: ["partner"], partner: 6, name: "양창수", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 8, pid: 0, ppid: 1, tags: ["default"], partner: 9, name: "정혜경", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 9, pid: 8, tags: ["partner"], partner: 8, name: "박종두", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 10, pid: 2, ppid: 3, tags: ["default"], name: "정지은", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 11, pid: 2, ppid: 3, tags: ["default"], name: "정지우", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 12, pid: 2, ppid: 3, tags: ["default"], name: "정우성", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 13, pid: 4, ppid: 5, tags: ["default"], name: "김솔", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 14, pid: 4, ppid: 5, tags: ["default"], name: "김민태", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 15, pid: 6, ppid:7, tags: ["default"], name: "양선", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 16, pid: 6, ppid:7, tags: ["default"], name: "양은혜", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 17, pid: 6, ppid:7, tags: ["default"], name: "양한나", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 18, pid: 8, ppid:9, tags: ["default"], name: "박준수", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 19, pid: 8, ppid:9, tags: ["default"], name: "박승수", gender: "male", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
//     { id: 20, pid: 8, ppid:9, tags: ["default"], name: "박혜수", gender: "female", img: "https://cdn.balkan.app/shared/empty-img-white.svg" },
// ];



// $('#step1-submit').click(function(){
//     db_log_newMeeting.name = $('#meeting-name').val();
//     db_log_newMeeting.description = $('#meeting-description').val();
// })

// $('#step2-submit').click(function(){
//     db_log_newMeeting.participants = participants_transfer.getSelectedItems();
// })

// $('#step3-submit').click(function(){
//     db_log_newMeeting.place = arrPlace;
//     db_log_newMeeting.noMorePlace = $('#place-recommend').is(':checked');
//     db_log_newMeeting.activity = arrActivity;
//     db_log_newMeeting.noMoreActivity = $('#activity-recommend').is(':checked');

// })

// $('#step4-submit').click(function(){
//     //db_log_newMeeting.meetingPeriod = db_period;

//     availableTime.push($("#start-time").val().slice(0,8));
//     availableTime.push($("#start-time").val().slice(11,19));

//     console.log(availableDates, availableTime, availableDates[0]);
//     db_log_newMeeting.availableDates = availableDates; // I don't know well
//     db_log_newMeeting.availableTimes = availableTime;

//     db.collection('families').doc().set({
//         meetings: [db_log_newMeeting],
//     })

// })

$('#final-submit').click(function(){
    if(!validatenums('surveyPeriod')) return;
    db_log_newMeeting.name = $('#meeting-name').val();
    db_log_newMeeting.description = $('#meeting-description').val();

    // db_log_newMeeting.participants = participants_transfer.getSelectedItems();
    db_log_newMeeting.participants = submitArr;

    db_log_newMeeting.place = arrPlace;
    db_log_newMeeting.noMorePlace = $('#place-recommend').is(':checked');
    db_log_newMeeting.activity = arrActivity;
    db_log_newMeeting.noMoreActivity = $('#activity-recommend').is(':checked');

    availableTime.push($("#start-time").val().slice(0,8));
    availableTime.push($("#start-time").val().slice(11,19));

    db_log_newMeeting.meetingPeriod = db_period;
    
    db_log_newMeeting.availableDates = availableDates; // I don't know well
    db_log_newMeeting.availableTimes = availableTime;

    db_log_newMeeting.surveyPeriod = Number($('#surveyPeriod').val());
    db_log_newMeeting.isPrivate = $('#btnradio2').is(':checked');
    

    db_log_newMeeting.isEnd = false;

    var now = new Date();
    now.setDate(now.getDate() + Number($('#surveyPeriod').val()));
    console.log(now);
    db_log_newMeeting.dueDate = now
    db_log_newMeeting.hostID = userID;

    console.log(db_log_newMeeting);
    
    db.collection('families').where('code', '==', familyCode)
        .get()
        .then((snapshot) => {
            var batch = db.batch();
            
            snapshot.forEach((doc) => {
                var docID = doc.id;
                var origMeetings = doc.data().meetings;
                var meetingSize = origMeetings.length;
                origMeetings.push(db_log_newMeeting)
                // console.log(db_log_newMeeting);
                var sfRef = db.collection('families').doc(docID);
                batch.update(sfRef, {"meetings": origMeetings,});
                
                var nycRef = db.collection('families').doc(docID).collection('chats').doc();
                batch.set(nycRef, {
                    chat: [],
                    meetingNumber: meetingSize
                });

            });
            batch.commit().then(() => {
                location.href = "home.html"
            });
            // 
        });

       
    
    // db.collection('families').doc().update({
    //     meetings: [db_log_newMeeting],
    // })
})

// for (let i=97; i<116; i ++){
//     db.collection('users').doc().set({
//         'id':   String.fromCharCode(i),
//         'pw': String(i-97),
//         'family-code': "00AB8",
//         'family-id': i-97
//     })
// }





mobiscroll.setOptions({
    locale: mobiscroll.localeEn,  // Specify language like: locale: mobiscroll.localePl or omit setting to use default
    theme: 'windows',            // More info about themeVariant: https://docs.mobiscroll.com/5-4-0/javascript/datetime#opt-themeVariant
});

console.log(mobiscroll);

$('#start-time').mobiscroll().datepicker({
    controls: ['time'],
    select: 'range',
    showRangeLabels: true,
    stepMinute: 60,
    timeFormat: "hh:00 A"
});

$('#logout-button').click(() => {
    localStorage.removeItem('family-code');
    localStorage.removeItem('family-id');
localStorage.removeItem('name');
localStorage.removeItem('img');
    localStorage.removeItem('id');
    localStorage.removeItem('pw');
    location.href = "index.html";
    localStorage.removeItem('real-family-id');
})

if (!imgDrawn) {
    db.collection('families').where('code', '==', familyCode).get().then((snapshot) => {
        var members;
        console.log('here');
        snapshot.forEach((doc) => {
            console.log('userID: '+userID)
            members = doc.data().members;
            console.log(members);
            for (var member of members) {
                if (member.id == userID) {
                    $('#user-name').text(member.name);
                    $('#user-img').attr('src', member.img);
                }
            }
        })
    })
}