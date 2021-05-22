const familyCode = "00AB8", meetingNumber = 0, userID = 0;

const chat = [
    {id: 3, text: '가평이 제일 표가 많네! 가평 ㄱㄱ?', time: new Date(2021,4,20,17,24,30,0), like: [2, 5, 7]},
    {id: 7, text: '근데 가평 이번 주에 비 온대ㅠㅜ', time: new Date(2021,4,20,19,24,30,0), like: [3, 8]}
]

const locationData = [
    {name: '<a data-bs-toggle="tooltip" data-bs-placement="right" title="" data-bs-original-title="아빠, 작은아빠, 누나">가평</a>', weight: 3, tooltip: '엄마, 누나, 나'},
    {name: '홍대', weight: 2, tooltip: '누나, 나'},
    {name: '동해바다', weight: 2, tooltip: '할머니, 아빠'},
    {name: '광안리', weight: 3, tooltip: '아빠, 작은아빠, 누나'},
    {name: '대관령', weight: 1, tooltip: '나'},
    {name: '경주', weight: 1, tooltip: '할머니'},
]

const activityData = [
    {name: '호캉스', weight: 5, tooltip: '엄마, 누나, 나, 아빠, 할머니'},
    {name: '캠핑', weight: 2, tooltip: '누나, 나'},
    {name: '수다 떨기', weight: 2, tooltip: '할머니, 아빠'},
    {name: '등산', weight: 3, tooltip: '아빠, 작은아빠, 누나'},
    {name: '간장게장 먹기', weight: 1, tooltip: '나'},
]

let a='아빠, 작은아빠, 누나';
// acitivitiData.filter()

let locationOptions = {
    container: {
    },
    tag: {
        minFontSize: 12,
        maxFontSize: 20,
        format: '{tag.name}'
    },
    data: locationData
}

let activityOptions = {
    container: {
    },
    tag: {
        minFontSize: 12,
        maxFontSize: 20,
        format: `<a>{tag.name}</a>`
    },
    data: activityData
}

function resize() {
    locationOptions.container.width = $('#location-card').width();
    activityOptions.container.width = $('#activity-card').width();
    $('#locationCloud').tagCloud(locationOptions);
    $('#activityCloud').tagCloud(activityOptions);
}
resize();

var map = new naver.maps.Map("map", {
    center: new naver.maps.LatLng(35.8, 127.51),
    zoom: 1
});

const markers = [], infoWindows = [];
const latlngs = [
    new naver.maps.LatLng(37.3595704, 127.105399),
    new naver.maps.LatLng(35.3595704, 128.105399),
    new naver.maps.LatLng(37.3596704, 127.106399),
    new naver.maps.LatLng(37.4595704, 127.905399),
];

const people = [
    '나', '누나', '엄마', '할머니'
];

for (var i=0; i<latlngs.length; i++) {
    var marker = new naver.maps.Marker({
        position: latlngs[i],
        map: map
    });
    var infoWindow = new naver.maps.InfoWindow({
        content: `<p style="padding-top:10px;padding-left:10px;padding-right:10px;">${people[i]}</p>`
    });
    markers.push(marker);
    infoWindows.push(infoWindow);
    naver.maps.Event.addListener(markers[i], 'mouseover', getClickHandler(i));
}

function getClickHandler(seq) {
    return function (e) {
        var marker = markers[seq], infoWindow = infoWindows[seq];
        if (infoWindow.getMap()) {
            infoWindow.close();
        } else {
            infoWindow.open(map, marker);
        }
    }
}

function tooltipSet() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

}

function bindEvents() {
    $('#chat-button').click(() => {
        var newChatElem = {
            id: userID,
            text: $('#chat-input').val(),
            time: new Date(),
            like: []
        }
        chat.push(newChatElem);
        $('#chat-input').val('')
        drawChat(chat.length-1);
    });
    $(`.bi-heart-fill`).click((event) => {
        $(event.target).css({fill: '#FF9999'});
        console.log($(event.target));
    });

    tooltipSet();
}

function timeCalculate(time) {
    return `${time.getMonth()+1}월 ${time.getDate()}일 ${time.getHours()}시 ${time.getMinutes()}분` 
}

function drawChat(idx) {
    var chatElem = chat[idx];
    if (userID != chatElem.id) {
        $('#chat').append(
        `<div class="incoming_msg">
            <div class="incoming_msg_img">
                <a href="#" class="d-inline-block">
                    <img src="${members[chatElem.id].img}" style="width:30px;height:30px;border-radius:70%;"></img>
                </a>
                <p>${members[chatElem.id].name}</p>
            </div>
            <div class="received_msg">
                <div class="received_withd_msg">
                    <p style="float:left">${chatElem.text}</p>
                    <a style="float:right" class="d-inline-block" data-bs-toggle="tooltip" data-bs-placement="right" title="" data-bs-original-title="${chatElem.like.map((id) => members[id].name).join(', ')}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffc0cb" class="bi bi-heart-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                        </svg>
                    </a>
                    <span class="time_date">${timeCalculate(chatElem.time)}</span></div>
                </div>
            </div>
        </div>`)
    }
    else {
        $('#chat').append(
        `<div class="outgoing_msg">
            <div class="sent_msg">
                <p style="float:left">${chatElem.text}</p>
                <a style="float:right" class="d-inline-block" data-bs-toggle="tooltip" data-bs-placement="left" title="" data-bs-original-title="${chatElem.like.map((id) => members[id].name).join(', ')}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffc0cb" class="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                    </svg>
                </a>
                <span class="time_date">${timeCalculate(chatElem.time)}</span> </div>
            </div>
        </div>`)
    }
    tooltipSet();
}

$(document).ready(function() {
    db.collection('families').where('code', '==', familyCode)
    .get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            docID = doc.id;
            meetings = doc.data().meetings;
            members = doc.data().members;
        });
        for (var i=0; i<chat.length; i++) drawChat(i);
        bindEvents();
    });
});