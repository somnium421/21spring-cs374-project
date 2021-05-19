const myTagList = [
    {name: '가평', weight: 3, tooltip: '엄마, 누나, 나'},
    {name: '홍대', weight: 2, tooltip: '누나, 나'},
    {name: '동해바다', weight: 2, tooltip: '할머니, 아빠'},
    {name: '광안리', weight: 3, tooltip: '아빠, 작은아빠, 누나'},
    {name: '대관령', weight: 1, tooltip: '나'},
    {name: '경주', weight: 1, tooltip: '할머니'},
]
let options = {
    container: {
        width: 300
    },
    tag: {
        minFontSize: 12,
        maxFontSize: 20,
        format: '<a>{tag.name}</a>'
    },
    data: myTagList
}

$('#tagCloud').tagCloud(options);

function call() {
    console.log($('#location-card').width(), options.container.width);
    options.container.width = $('#location-card').width();
    $('#tagCloud').tagCloud(options);
}