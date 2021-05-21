//import firebase from "firebase";

const familyCode = "00AB8", meetingNumber = 0;
var meeting;

var navListItems = $('div.setup-panel div a'),
    allWells = $('.setup-content'),
    allNextBtn = $('.nextBtn'),
    allPrevBtn = $('.prevBtn');
    allWells.hide();

function toggle(target) {
    if (target.data('selected')) {
        target.removeClass('btn-primary');      
        target.addClass('btn-outline-primary');  
    }
    else {
        target.removeClass('btn-outline-primary');
        target.addClass('btn-primary');
    }
    target.data('selected', !target.data('selected'));
    return !target.data('selected');
}

$(document).ready(function() {
    console.log('hello');
    db.collection('families').where('code', '==', familyCode)
    .get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            meeting = doc.data().meetings[meetingNumber];
            console.log(meeting);
            for (var place of meeting.place) {
                console.log(place);
                $('#place-tags').append(`<button type="tag" class="tag btn btn-primary btn-sm mt-2 mx-1 rounded-pill">${place}</button>`)
            }
            $('#place-tags').append(`<button type="tag" class="tag btn btn-primary btn-sm mt-2 mx-1 rounded-pill">+</button>`)
            
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
        if (isValid)
            nextStepWizard.removeAttr('disabled').trigger('click');
    });

    $('div.setup-panel div a.btn-light').trigger('click');

    $("#place-add").click (function(e){
        e.preventDefault();
        if ($('#place-input').val() !== "") {
            var inputText = $('#place-input').val();
            // arrActivity.push(inputText);
            $(this).parent().parent().parent().append(`<button type="tag" class="tag btn btn-primary btn-sm mt-2 mx-1 rounded-pill">${inputText}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x remove-tag" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg></button>`)
            $('#place-input').val("");
        }
        
    })

    $('#place-add').click(function(event) {
        console.log('hello');
        if (toggle($(event.target))) $('#place-input').addClass('d-none');
        else $('#place-input').removeClass('d-none');
    });

    $('#location-add-tag').click(function() {
        if ($('#location-input-text').val() != '') {
            $('#location-add').before(`<button type="button" class="btn btn-primary rounded-pill me-2 selectable" data-selected=true>${$('#location-input-text').val()}</button>`);
            $('#location-input-text').val('');
        }
    });

    $('#activity-add').click(function(event) {
        console.log('hello');
        if (toggle($(event.target))) $('#activity-input').addClass('d-none');
        else $('#activity-input').removeClass('d-none');
    });

    $('#activity-add-tag').click(function() {
        if ($('#activity-input-text').val() != '') {
            $('#activity-add').before(`<button type="button" class="btn btn-primary rounded-pill me-2 selectable" data-selected=true>${$('#activity-input-text').val()}</button>`);
            $('#activity-input-text').val('');
        }
    });

    $('.selectable').click(function(event) {
        toggle($(event.target));
    });

    $('#departure-place-button').click(function(event) {
        getAddr();
    });
}
bindEvents();
    
$(document).on('click', '.remove-tag', function(e){
    e.preventDefault();
    if ($(e.target)[0].outerHTML.slice(1,5)==="path") $(e.target).parent().parent().remove();
    else $(e.target).parent().remove();
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
    // $('#departure-place').val('');
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

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
});

