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

function call() {
    locationOptions.container.width = $('#location-card').width();
    activityOptions.container.width = $('#activity-card').width();

    $('#locationCloud').tagCloud(locationOptions);
    $('#activityCloud').tagCloud(activityOptions);
}

call();

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