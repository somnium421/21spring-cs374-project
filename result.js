const meetingNumber = 0, userID = 0;

const chat = [
    {id: 3, text: '가평이 제일 표가 많네! 가평 ㄱㄱ?', time: 11341234, like: [2, 5, 7]},
    {id: 0, text: '근데 가평 이번 주에 비 온대ㅠㅜ', time:12341234123, like: [3, 8]}
]

const locationData = [
    {name: '가평', weight: 3, tooltip: '엄마, 누나, 나'},
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

let locationOptions = {
    container: {
    },
    tag: {
        minFontSize: 12,
        maxFontSize: 20,
        format: '<a>{tag.name}</a>'
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

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

chat.sort((a, b) => a.time-b.time);
for (var chatElem of chat) {
    if (userID == chatElem.id) {
        $('#chat').append(
        `<div class="incoming_msg">
            <div class="incoming_msg_img">
                <a href="#" class="d-inline-block">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" class="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                    </svg>
                </a>
                <p>누나</p>
            </div>
            <div class="received_msg">
                <div class="received_withd_msg">
                <p style="float:left">가평이 제일 표가 많네! 가평 ㄱㄱ?</p>
                <a href="#" style="float:right" class="d-inline-block" data-bs-toggle="tooltip" data-bs-placement="right" title="" data-bs-original-title="동생, 아빠, 엄마">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffc0cb" class="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                    </svg>
                </a>
                <span class="time_date">어제 오후 8시 48분</span></div>
            </div>
        </div>`)
    }
    console.log(chatElem);
}