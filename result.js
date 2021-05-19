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
        format: '<a>{tag.name}</a>'
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