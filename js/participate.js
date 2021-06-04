//import firebase from "firebase";
const familyCode = !localStorage.getItem('family-code') ? '00AB8' : localStorage.getItem('family-code')
const meetingNumber = !localStorage.getItem('meeting-number') ? 0 : localStorage.getItem('meeting-number')
const userID = !localStorage.getItem('family-id') ? 0 : localStorage.getItem('family-id')

const answers = [];
var meetings, members, docID;

var userAvailableDates = [];
var userAvailableTime = [];

var answer = {
    place: [],
    activity: [],
    accommodation: [],
    departure: [],
    transportation: [],
};

var navListItems = $('div.setup-panel div a'),
    allWells = $('.setup-content'),
    allNextBtn = $('.nextBtn'),
    allPrevBtn = $('.prevBtn');
    allWells.hide();

function toggle(target) {
    if (target.data('selected')) {
        target.removeClass('btn-primary');      
        target.addClass('btn-outline-primary');  
        if (target.parent().attr('id') == 'place-tags' && target.html() != '+') answer.place.splice(answer.place.indexOf(target.html()), 1);
        if (target.parent().attr('id') == 'activity-tags' && target.html() != '+') answer.activity.splice(answer.activity.indexOf(target.html()), 1);
    }
    else {
        target.removeClass('btn-outline-primary');
        target.addClass('btn-primary');
        if (target.parent().attr('id') == 'place-tags' && target.html() != '+') answer.place.push(target.html());
        if (target.parent().attr('id') == 'activity-tags' && target.html() != '+') answer.activity.push(target.html());
    }
    target.data('selected', !target.data('selected'));
    return !target.data('selected');
}

$(document).ready(function() {
    db.collection('families').where('code', '==', familyCode)
    .get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            docID = doc.id;
            meetings = doc.data().meetings;
            members = doc.data().members;
            //console.log('hello');
            //console.log(userID, members);
            for (var member of members) {
                if (member.id == userID) {
                    $('#user-name').text(member.name);
                    $('#user-img').attr('src', member.img);
                    //console.log('hello');
                }
            }


            db.collection('families').doc(docID).collection('answers').where('meetingNumber', '==', meetingNumber).get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    answers.push(doc.data());
                })
                var participants = meetings[meetingNumber].participants;
                if (participants.filter(({id, name})=> Number(id) === Number(userID)).length === 0) participants.push({"id":String(userID), "name": ""});

                //console.log(participants.filter(({id, name})=> Number(id) === Number(userID)).length !== 0);
                //console.log(participants);
                const answered = [];
                for (var participant of participants) {
                    for (var answer of answers) {
                        if (answer.userID == participant.id) {
                            answered.push(Number(answer.userID));
                            $('#meeting-participants').append(` <a class="d-inline-block" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title=${participant.name}>
                                                            <img src="${members[participant.id].img}" style="width:30px;height:30px;border-radius:70%;margin-bottom:2px;"></img>
                                                        </a>`);
                        }
                    }
                }
                for (var participant of participants) {
                    if (!(Number(participant.id) in answered)) $('#meeting-participants').append(` <a class="d-inline-block" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title=${participant.name}>
                                                            <img src="${members[participant.id].img}" style="width:30px;height:30px;border-radius:70%;margin-bottom:2px;filter:brightness(0.5);"></img>
                                                        </a>`);
                }
            })

            if (meetings[meetingNumber].isPrivate) $('#is-private').append('<span class="text-muted" style="font-size: smaller;"><i class="fas fa-lock me-1"></i> 비공개</span>')
            else $('#is-private').append('<span class="text-muted" style="font-size: smaller;"><i class="fas fa-globe-asia me-1"></i> 공개</span>')

            $('#meeting-name').text(meetings[meetingNumber].name);

            $('#meeting-description').text(meetings[meetingNumber].description);
            // console.log(meetings[meetingNumber].availableDates[0].toDate());
            //if (true) {
            if (meetings[meetingNumber].meetingPeriod.day > 1 && meetings[meetingNumber].availableDates.length == meetings[meetingNumber].meetingPeriod.day) {
                var time1 = meetings[meetingNumber].availableDates[0].toDate(), time2 = meetings[meetingNumber].availableDates[meetings[meetingNumber].availableDates.length-1].toDate();
                $('#fixed-date').append(`<h4><span class="badge rounded-pill bg-light text-dark"><i class="fa fa-calendar" aria-hidden="true"></i> 
                    &nbsp; ${time1.getYear()+1900}.${time1.getMonth()+1}.${time1.getDate()} ~ ${time2.getYear()+1900}.${time2.getMonth()+1}.${time2.getDate()} </span></h4>
                `);
            }
            //else {
            else if (meetings[meetingNumber].meetingPeriod.day <= 1 && meetings[meetingNumber].availableDates.length == 1) {
                var time = meetings[meetingNumber].availableDates[0].toDate()
                $('#fixed-date').append(`<h4><span class="badge rounded-pill bg-light text-dark"><i class="fa fa-calendar" aria-hidden="true"></i> 
                    &nbsp; ${time.getYear()+1900}.${time.getMonth()+1}.${time.getDate()} </span></h4>
                `);
            }

            var meetingTags;
            if (meetings[meetingNumber].meetingPeriod.day == 0) {
                meetingTags = `<span class="badge rounded-pill bg-light text-dark">${meetings[meetingNumber].meetingPeriod.hr}시간</span> <span style="font-size: smaller;">동안</span>`;
                $("#accommodation-div").remove();
            }
            else if (meetings[meetingNumber].meetingPeriod.day == 1) {
                meetingTags = `<span class="badge rounded-pill bg-light text-dark">하루</span> <span style="font-size: smaller;">종일</span>`;
                $("#accommodation-div").remove();
            }
            else meetingTags = `<span class="badge rounded-pill bg-light text-dark">${meetings[meetingNumber].meetingPeriod.day-1}박 ${meetings[meetingNumber].meetingPeriod.day}일</span> <span style="font-size: smaller;">동안</span> `
            if (meetings[meetingNumber].noMorePlace) {
                var tmp = meetings[meetingNumber].place.map((x) => `<span class="badge rounded-pill bg-light text-dark">${x}</span>`).join('');
                meetingTags += tmp + '<span style="font-size: smaller;">에서</span>';
            }
            if (meetings[meetingNumber].noMoreActivity) {
                var tmp = meetings[meetingNumber].activity.map((x) => `<span class="badge rounded-pill bg-light text-dark">${x}</span>`).join('');
                meetingTags += tmp;
            }
            $('#meeting-tags').append(meetingTags);
            // console.log(doc.data().meetings[meetingNumber].availableTimes);

            
            setDateDisabled(doc.data().meetings[meetingNumber].availableDates);

            if (meetings[meetingNumber].meetingPeriod.day < 1){
                setTimeDisabled(doc.data().meetings[meetingNumber].availableTimes);
            } else {
                $("#available-time-form").remove();
            }
            

            var placeSet = new Set(meetings[meetingNumber].place), activitySet = new Set(meetings[meetingNumber].activity);
            db.collection('families').doc(docID).collection('answers').where('meetingNumber', '==', meetingNumber)
            .get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    for (var place of doc.data().place) placeSet.add(place);
                    for (var activity of doc.data().activity) activitySet.add(activity);
                });
                for (var place of placeSet) {
                    $('#place-tags').append(`<button type="button" class="tag btn btn-outline-primary btn-sm mt-2 mx-1 rounded-pill selectable data-selected=false">${place}</button>`)
                }
                if (!meetings[meetingNumber].noMorePlace) $('#place-tags').append(`<button type="button" id="place-input-reveal" class="tag btn btn-outline-primary btn-sm mt-2 mx-1 rounded-pill data-selected=false">+</button>`);
    
                for (var activity of activitySet) {
                    $('#activity-tags').append(`<button type="button" class="tag btn btn-outline-primary btn-sm mt-2 mx-1 rounded-pill selectable data-selected=false">${activity}</button>`)
                }
                if (!meetings[meetingNumber].noMoreActivity) $('#activity-tags').append(`<button type="button" id="activity-input-reveal" class="tag btn btn-outline-primary btn-sm mt-2 mx-1 rounded-pill data-selected=false">+</button>`);
                
                
                bindEvents();
            })
        });
    });
});


function find(newArrDates, date){
    for (let i = 0; i< newArrDates.length; i ++) {
        if (date.toLocaleString() === newArrDates[i].toLocaleString()) {
            return false
        }
    } 
    return true;
}

function setDateDisabled(arrDates){
    arrDates.sort();

    newArrDates = arrDates.map(({seconds}) => {
        const millis = seconds * 1000;
        return new Date(millis);
        // const len = dataObject.toLocaleString().length
        // return dataObject.toLocaleString().slice(0,len-12);
    })

    var arrDatesDisabled = [];
    var arrLen = newArrDates.length
    var srt_Date = newArrDates[0].toLocaleString().slice(0,newArrDates[0].toLocaleString().length-12);
    var end_Date = newArrDates[arrLen-1].toLocaleString().slice(0,newArrDates[arrLen-1].toLocaleString().length-12);
    
    let date = new Date(newArrDates[0]);

    const len = newArrDates.length;

    while (date < newArrDates[len-1]){

        date.setDate(date.getDate() + 1);
        // console.log(date.toLocaleString());

        if (find(newArrDates, date)){
            var strLen = date.toLocaleString().length;
            arrDatesDisabled.push(date.toLocaleString().slice(0,strLen-12));
        } 
    }


    $("#Txt_Date").datepicker({
        format: 'yyyy. m. d.',
        inline: false,
        lang: 'en',
        step: 10,
        multidate: true,
        closeOnDateSelect: true,
        todayHighlight: false,
        startDate: srt_Date,
        endDate: end_Date,
        datesDisabled: arrDatesDisabled,
    })
    .on("changeDate", function(e) {
    
        // console.log(e.dates);
        userAvailableDates = e.dates.map((el) => new Date(el).getTime())
                                    .sort()
                                    .map((el) => new Date(el));
        // console.log(userAvailableDates);
    })
}

function setTimeDisabled(arrTime){

    mobiscroll.setOptions({
        locale: mobiscroll.localeEn,  // Specify language like: locale: mobiscroll.localePl or omit setting to use default
        theme: 'windows',            // More info about themeVariant: https://docs.mobiscroll.com/5-4-0/javascript/datetime#opt-themeVariant
    });
    
    if (arrTime[0].slice(6,8) === "AM") var minTime = arrTime[0].slice(0,5);
    else var minTime = String(Number(arrTime[0].slice(0,2))+12) + arrTime[0].slice(2,5);
    if (arrTime[1].slice(6,8) === "AM") var maxTime = arrTime[1].slice(0,5);
    else var maxTime = String(Number(arrTime[1].slice(0,2))+12) + arrTime[1].slice(2,5);

    $('#start-time').mobiscroll().datepicker({
        controls: ['time'],
        select: 'range',
        showRangeLabels: true,
        stepMinute: 60,
        timeFormat: "hh:00 A",
        min: minTime,
        max: maxTime,
    });

}

function validatearr(id, arr, len){
    if (arr.length != len){
        $("#"+id+"Help").remove();
        //document.getElementById(id).style = "border: ''";
        return true; 
    }
    var text = `<small id="`+id+`Help" class="form-text" style="color: red">필수선택 사항입니다. </small>`
    if ($("#"+id+"Help").length === 0) $("#"+id).parent().append(text);
    //document.getElementById(id).style = "border: 2px solid #E8ADAA";
    return false;
}

function validatearr2(id, arr, len){
    if (arr.length != len){
        $("#"+id+"Help").remove();
        //document.getElementById(id).style = "border: ''";
        return true; 
    }
    var text = `<small id="`+id+`Help" class="form-text" style="color: red">필수선택 사항입니다. </small>`
    if ($("#"+id+"Help").length === 0) $("#"+id).parent().append(text);
    //document.getElementById(id).style = "border: 2px solid #E8ADAA";
    return false;
}

function validatearr3(id, arr, len){
    if (arr.length == len || $("#day").val()> 0){
        $("#"+id+"Help").remove();

        //document.getElementById(id).style = "border: ''";
        return true; 
    }
    else if (arr.length == 0){
        var text = `<small id="`+id+`Help" class="form-text" style="color: red">필수선택 사항입니다. </small>`
        if ($("#"+id+"Help").length === 0) $("#"+id).parent().append(text);
        else $("#"+id+"Help").replaceWith(text);
        //document.getElementById(id).style = "border: 2px solid #E8ADAA";
        return false;
    }
    else{
        var text = `<small id="`+id+`Help" class="form-text" style="color: red">시작하는 시간과 끝나는 시간을 모두 선택하세요. </small>`
        if ($("#"+id+"Help").length === 0) $("#"+id).parent().parent().append(text);
        else $("#"+id+"Help").replaceWith(text);
        //document.getElementById(id).style = "border: 2px solid #E8ADAA";
        return false;
    }
}

function isRadioChecked(id){
    var test1 = document.getElementById("대중교통");
    var a = $(test1).prop("checked");
    var test2 = document.getElementById("자가용");
    var b = $(test2).prop("checked");
    var test3 = document.getElementById("도보");
    var c = $(test3).prop("checked");
    var test4 = document.getElementById("자전거");
    var d = $(test4).prop("checked");
    var checked = (a || b || c || d);
    if (checked){
        $("#"+id+"Help").remove();
        //document.getElementById(id).style = "border: ''";
        return true; 
    }
    else{
        var text = `<small id="`+id+`Help" class="form-text" style="color: red">필수선택 사항입니다. </small>`
        if ($("#"+id+"Help").length === 0) $("#"+id).parent().append(text);
        //document.getElementById(id).style = "border: 2px solid #E8ADAA";
        return false;
    }

}

function bindEvents() {
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
        switch(curId) {
            case 'step1-submit':
                break;
    
            case 'step2-submit':
                var a= validatearr('list-location', answer.departure, 0);
                var b = isRadioChecked('transportation-radio');
                if (a&&b) break;
                return;
    
            default:
                break;
        }
        // console.log('hi');
    
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
        if (isValid) nextStepWizard.removeAttr('disabled').trigger('click');
    });

    $('div.setup-panel div a.btn-light').trigger('click');

    $("#place-add").click (function(e){
        e.preventDefault();
        if ($('#place-input').val() !== "") {
            var inputText = $('#place-input').val();
            answer.place.push(inputText);
            $('#place-input-reveal').before(`<button type="button" class="tag btn btn-primary btn-sm mt-2 mx-1 rounded-pill" data-place-activity="place">${inputText}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x remove-tag" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg></button>`);
            $('#place-input').val("");
        }
    });

    $('#place-input-reveal').click(function(event) {
        if (toggle($(event.target))) $('#place-input-div').addClass('d-none');
        else $('#place-input-div').removeClass('d-none');
    });

    $("#activity-add").click (function(e){
        e.preventDefault();
        if ($('#activity-input').val() !== "") {
            var inputText = $('#activity-input').val();
            answer.activity.push(inputText);
            $('#activity-input-reveal').before(`<button type="button" class="tag btn btn-primary btn-sm mt-2 mx-1 rounded-pill" data-place-activity="activity">${inputText}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x remove-tag" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg></button>`);
            $('#activity-input').val("");
        }
    });

    $('#activity-input-reveal').click(function(event) {
        if (toggle($(event.target))) $('#activity-input-div').addClass('d-none');
        else $('#activity-input-div').removeClass('d-none');
    });

    $('.selectable').click(function(event) {
        toggle($(event.target));
    });

    $('#departure-place-button').click(function(event) {
        getAddr();
    });

    $('#submit-button').click(function() {
        var a = validatearr2('Txt_Date', userAvailableDates, 0);
        var b = true;

        if ($("#start-time").length > 0){ //period.day < 1 인 경우에는 선택자가 이미 사라져있음.
            var b = validatearr3('start-time', $('#start-time').val(), 19);
            userAvailableTime.push($("#start-time").val().slice(0,8));
            userAvailableTime.push($("#start-time").val().slice(11,19));
        };

        if( a && b == false) return;

        // console.log(userAvailableDates, userAvailableTime);
        for (var checked of $("#accommodation input[type='checkbox']:checked")) answer.accommodation.push($(checked).attr('id'));
        for (var transportation of $("#transportation input[type='radio']:checked")) answer.transportation.push($(transportation).attr('id'));
        // console.log(answer);
        // userAvailableDates 는 다른곳에서 받음
        
        var batch = db.batch();

        var ansRef = db.collection('families').doc(docID).collection('answers').doc();
        batch.set (ansRef, {
            meetingNumber: meetingNumber,
            userID: userID,
            place: answer.place,
            activity: answer.activity,
            accommodation: answer.accommodation,
            departure: answer.departure,
            transportation: answer.transportation,
            availableDates: userAvailableDates,
            availableTime: userAvailableTime
        });

        batch.commit().then(() => {
            location.href = "home.html";
        })
        
    });

    $('#logout-button').click(() => {
        localStorage.removeItem('family-code');
        localStorage.removeItem('family-id');
        localStorage.removeItem('id');
        localStorage.removeItem('pw');
        location.href = "index.html";
    })

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

};
    
$(document).on('click', '.remove-tag', function(e){
    e.preventDefault();
    if ($(e.target)[0].outerHTML.slice(1,5)==="path") {
        if ($(e.target).parent().parent().data('place-activity') == "place") answer.place.splice(answer.place.indexOf($(e.target).parent().parent().text()), 1);
        if ($(e.target).parent().parent().data('place-activity') == "activity") answer.activity.splice(answer.activity.indexOf($(e.target).parent().parent().text()), 1);   
        $(e.target).parent().parent().remove();
    }
    else {
        // console.log(answer.place);
        if ($(e.target).parent().data('place-activity') == "place") answer.place.splice(answer.place.indexOf($(e.target).parent().text()), 1);
        if ($(e.target).parent().data('place-activity') == "activity") answer.activity.splice(answer.activity.indexOf($(e.target).parent().text()), 1);
        $(e.target).parent().remove();
    }
})

var map, marker, currPos;
navigator.geolocation.getCurrentPosition(onSuccessGeolocation, onErrorGeolocation);

/*
var mapContainer = document.getElementById('kakao-map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 1 // 지도의 확대 레벨
    };  

// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption); */

var geocoder = new kakao.maps.services.Geocoder();

function searchDetailAddrFromCoords(coords, callback) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}


function onSuccessGeolocation(position) {
    // console.log('success')
    currPos = new naver.maps.LatLng(position.coords.latitude, position.coords.longitude);
    map = new naver.maps.Map("map", {
        center: currPos,
        zoom: 15
    });
    marker = new naver.maps.Marker({
        position: currPos,
        map: map
    });
    searchDetailAddrFromCoords(new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude), function(result, status) {
        if (status == kakao.maps.services.Status.OK) {
            // console.log(result[0].road_address.address_name);
            $('#departure-place').attr('placeholder', `현재 위치 : ${result[0].road_address.address_name}`)
            answer.departure = [position.coords.longitude, position.coords.latitude];
        }
    })
}

function onErrorGeolocation() {
    // console.log('failed')
    map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(36.3717787, 127.3608437),
        zoom: 15
    });
}
  
function searchAddressToCoordinate(address) {
    naver.maps.Service.geocode({query: address}, function(status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
            if (!address) return alert('Geocode Error, Please check address');
            return alert('Geocode Error, address:' + address);
        }
        if (response.v2.meta.totalCount === 0) return alert('No result.');
        var item = response.v2.addresses[0],
            point = new naver.maps.Point(item.x, item.y);
        console.log(item.x, item.y);
        answer.departure = [item.x, item.y];
        if (marker == undefined) {
            marker = new naver.maps.Marker({
                position: point,
                map: map
            });
        }
        else marker.setPosition(point);
        map.setCenter(point);
    });
}

function getAddr(){
    $.getJSON(`https://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&countPerPage=10&confmKey=devU01TX0FVVEgyMDIxMDUxNzE3MjgzMDExMTE3Mjk=&keyword=${$('#departure-place').val()}&resultType=json`, {format:"json"})
    .done(function(data) {
        // console.log(data.results)
        if (data.results.common.totalCount == 0) alert('존재하지 않는 주소입니다');
        else if (data.results.common.totalCount == 1) searchAddressToCoordinate(data.results.juso[0].roadAddr);
        else {
            $('#list-location').empty();
            for (var juso of data.results.juso) {
                $('#list-location').append(`<a class="list-group-item list-group-item-action" onclick="locationClick(event)">${juso.roadAddr}</a>`);
            }
        }
    })
    .fail(function() {
        alert('No result');
    });
}

// var prevLocation;

function locationClick(event) {
    /*
    if (prevLocation) {
        prevLocation.removeClass('active');
    }
    prevLocation = $(event.target);
    prevLocation.addClass('active');
    */
    searchAddressToCoordinate($(event.target).text());
    $('#departure-place').val($(event.target).text());
    $(event.target).parent().remove();
}

