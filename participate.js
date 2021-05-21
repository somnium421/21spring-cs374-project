//import firebase from "firebase";

const familyCode = "00AB8", meetingNumber = 0, userID = 0;
var meetings, members, docID;

var answer = {
    place: [],
    activity: [],
    accommodation: [],
    departure: undefined,
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
        if (target.parent().attr('id') == 'place-tags' && target.html() != '+') answer.place.splice(answer.place.indexOf(target.html()));
        if (target.parent().attr('id') == 'activity-tags' && target.html() != '+') answer.activity.splice(answer.activity.indexOf(target.html()));
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
            if (meetings[meetingNumber].isPrivate) $('#is-private').append('<span class="text-muted" style="font-size: smaller;"><i class="fas fa-lock me-1"></i> 비공개</span>')
            else $('#is-private').append('<span class="text-muted" style="font-size: smaller;"><i class="fas fa-globe-asia me-1"></i> 공개</span>')
            $('#meeting-name').text(meetings[meetingNumber].name);
            $('#meeting-description').text(meetings[meetingNumber].description);
            for (var participant of meetings[meetingNumber].participants) {
                $('#meeting-participants').append(` <a href="#" class="d-inline-block" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title=${participant.name}>
                                                        <img src="${members[participant.id].img}" style="width:30px;height:30px;border-radius:70%;opacity:${(Math.random(1)<0.5)?0.5:1}"></img>
                                                    </a>`);
            }

            for (var place of meetings[meetingNumber].place) {
                $('#place-tags').append(`<button type="button" class="tag btn btn-outline-primary btn-sm mt-2 mx-1 rounded-pill selectable data-selected=false">${place}</button>`)
            }
            $('#place-tags').append(`<button type="button" id="place-input-reveal" class="tag btn btn-outline-primary btn-sm mt-2 mx-1 rounded-pill data-selected=false">+</button>`);
            for (var activity of meetings[meetingNumber].activity) {
                $('#activity-tags').append(`<button type="button" class="tag btn btn-outline-primary btn-sm mt-2 mx-1 rounded-pill selectable data-selected=false">${activity}</button>`)
            }
            $('#activity-tags').append(`<button type="button" id="activity-input-reveal" class="tag btn btn-outline-primary btn-sm mt-2 mx-1 rounded-pill data-selected=false">+</button>`);
           
            bindEvents();
        });
    });
});

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
        
        if (answer.accommodation=[]) for (var checked of $("#accommodation input[type='checkbox']:checked")) answer.accommodation.push($(checked).attr('id'));
        if (answer.transportation=[]) for (var transportation of $("#transportation input[type='radio']:checked")) answer.transportation.push($(transportation).attr('id'));
        
        //modify!!!!
        meetings[meetingNumber].participants[userID]['answer'] = answer;
        console.log(meetings);
        db.collection('families').doc(docID).update({meetings: meetings});
        
        /*var update = {};
        update[`meetings[${meetingNumber}].participants[${userID}].answer`] = answer;
        console.log(update);*/
        /*
        db.collection('families').doc(docID).update({
            "meetings[0].participants[0].answer": answer
        });*/
        /*
        db.collection('families').where('code', '==', familyCode)
            .get()
            .then((snapshot) => {
                console.log('hello');
                snapshot.forEach((doc) => {
                    console.log(doc.id);
                    update = doc.data().meetings;
                    update[meetingNumber].participants[userID]['answer'] = answer;
                    console.log(update);
                    //update[`meetings[${meetingNumber}].participants[${userID}]`] = doc.data().meetings[meetingNumber].participants[userID];
                    //update[`meetings[${meetingNumber}].participants[${userID}].answer`] = answer;
                })
                db.collection('families').where('code', '==', familyCode).get().update(update);
            })*/
    });

    $('div.setup-panel div a.btn-light').trigger('click');

    $("#place-add").click (function(e){
        e.preventDefault();
        if ($('#place-input').val() !== "") {
            var inputText = $('#place-input').val();
            answer.place.push(inputText);
            $('#place-input-reveal').before(`<button type="tag" class="tag btn btn-primary btn-sm mt-2 mx-1 rounded-pill" data-place-activity="place">${inputText}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x remove-tag" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg></button>`);
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
            $('#activity-input-reveal').before(`<button type="tag" class="tag btn btn-primary btn-sm mt-2 mx-1 rounded-pill" data-place-activity="activity">${inputText}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x remove-tag" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg></button>`);
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

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});

}
    
$(document).on('click', '.remove-tag', function(e){
    e.preventDefault();
    if ($(e.target)[0].outerHTML.slice(1,5)==="path") {
        console.log('1')
        console.log($(e.target).data('place-activity'))
        if ($(e.target).data('place-activity') == "place") answer.place.splice(answer.place.indexOf($(e.target).text()));
        if ($(e.target).data('place-activity') == "activity") answer.activity.splice(answer.activity.indexOf($(e.target).text()));    
        $(e.target).parent().parent().remove();
    }
    else {
        console.log('2')
        console.log($(e.target).parent().data('place-activity'))
        if ($(e.target).parent().data('place-activity') == "place") answer.place.splice(answer.place.indexOf($(e.target).parent().text()));
        if ($(e.target).parent().data('place-activity') == "activity") answer.activity.splice(answer.activity.indexOf($(e.target).parent().text()));
        $(e.target).parent().remove();
    }
})


var map, marker, currPos;
navigator.geolocation.getCurrentPosition(onSuccessGeolocation, onErrorGeolocation);

function onSuccessGeolocation(position) {
    currPos = new naver.maps.LatLng(position.coords.latitude, position.coords.longitude);
    map = new naver.maps.Map("map", {
        center: currPos,
        zoom: 15
    });
    marker = new naver.maps.Marker({
        position: currPos,
        map: map
    });
}

function onErrorGeolocation() {
    console.log('error')
}
  
function searchAddressToCoordinate(address) {
    answer.departure = address;
    naver.maps.Service.geocode({query: address}, function(status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
            if (!address) return alert('Geocode Error, Please check address');
            return alert('Geocode Error, address:' + address);
        }
        if (response.v2.meta.totalCount === 0) return alert('No result.');
        var item = response.v2.addresses[0],
            point = new naver.maps.Point(item.x, item.y);
        marker.setPosition(point);
        map.setCenter(point);
    });
}

function getAddr(){
    $.getJSON(`https://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&countPerPage=10&confmKey=devU01TX0FVVEgyMDIxMDUxNzE3MjgzMDExMTE3Mjk=&keyword=${$('#departure-place').val()}&resultType=json`, {format:"json"})
    .done(function(data) {
        console.log(data.results)
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
var prevLocation;
function locationClick(event) {
    if (prevLocation) {
        prevLocation.removeClass('active');
    }
    prevLocation = $(event.target);
    prevLocation.addClass('active');
    searchAddressToCoordinate(prevLocation.text());
}


