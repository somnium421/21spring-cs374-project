//import firebase from "firebase";
const familyCode = !localStorage.getItem('family-code') ? '00AB8' : localStorage.getItem('family-code');
const meetingNumber = !localStorage.getItem('meeting-number') ? 1 : Number(localStorage.getItem('meeting-number'));
const userID = !localStorage.getItem('family-id') ? 0 : Number(localStorage.getItem('family-id'));

const placeData = [], activityData = [], markers = [], infoWindows = [], latlngs = [], answers = [];
var meetings, members, chats,  docID, answerID;
var hostAvailableDates = {};
var datesChartData = {};
var hostAvailableTime = [];

let placeOptions = {
    container: {
    },
    tag: {
        minFontSize: 15,
        maxFontSize: 27,
        format: '{tag.name}'
    },
    data: placeData
}

let activityOptions = {
    container: {
    },
    tag: {
        minFontSize: 15,
        maxFontSize: 27,
        format: '{tag.name}'
    },
    data: activityData
}

function resize() {
    placeOptions.container.width = $('#place-card').width();
    activityOptions.container.width = $('#activity-card').width();
    $('#placeCloud').tagCloud(placeOptions);
    $('#activityCloud').tagCloud(activityOptions);
    $('#placeCloud').css("margin-top", ($('#map').height() - $('#placeCloud').height())/2 - 20);
    $('#activityCloud').css("margin-top", ($('#map').height() - $('#activityCloud').height())/2 - 20);
}

var map = new naver.maps.Map("map", {
    center: new naver.maps.LatLng(35.8, 127.51),
    zoom: 1
});

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
        if ($('#chat-input').val() != '') {
            var chat = {
                id: userID,
                text: $('#chat-input').val(),
                time: new Date(),
                like: []
            }
            chats.chat.push(chat);
            // console.log(chats);
            $('#chat-input').val('')
            db.collection('families').doc(docID).collection('chats').doc(answerID).update({
                chat: chats.chat
            })
            .then((snapshot) => {
                drawChat(chats.chat.length-1);
            });
        }
    });
    $('#logout-button').click(() => {
        localStorage.removeItem('family-code');
        localStorage.removeItem('family-id');
        localStorage.removeItem('id');
        localStorage.removeItem('pw');
        location.href = "index.html";
    })
    tooltipSet();
}

$(document).on('click', '.bi-heart-fill', function(e){
    e.preventDefault();
    if ($(e.target)[0].outerHTML.slice(1,5)==="path") {
        var idx = $(e.target).parent().data('idx');
        if ($(e.target).css('fill') != "rgb(255, 153, 153)") { // unclicked
            $(e.target).css({fill: 'rgb(255, 153, 153)'});
            chats.chat[idx].like.push(userID);
            $(e.target).parent().parent().attr('data-bs-original-title', chats.chat[idx].like.map((id) => members[id].name).join(', '));
        }
        else { // clicked
            $(e.target).css({fill: 'rgb(255, 192, 203)'});
            chats.chat[idx].like.splice(chats.chat[idx].like.indexOf(userID), 1);
            $(e.target).parent().parent().attr('data-bs-original-title', chats.chat[idx].like.map((id) => members[id].name).join(', '));
        }
    }
    db.collection('families').doc(docID).collection('chats').doc(answerID).update({
        chat: chats.chat
    })
})
var deleteTarget;
$(document).on('click', '.fa-times-circle', function(e){
    deleteTarget = e.target;
    //deleteIdx = $(e.target).data('idx');
});


$('#delete-button').click(() => {
    chats.chat.splice($(deleteTarget).data('idx'), 1);
    db.collection('families').doc(docID).collection('chats').doc(answerID).update({
        chat: chats.chat
    })
    $(deleteTarget).parent().parent().remove();
})

function timeCalculate(time) {
    if (!(time instanceof Date)) time = time.toDate();
    return `${time.getMonth()+1}월 ${time.getDate()}일 ${time.getHours()}시 ${time.getMinutes()}분` 
}

function drawChat(idx) {
    var chat = chats.chat[idx];
    if (userID != chat.id) { // incoming msg
        $('#chat').append(
        `<div class="incoming_msg">
            <div class="incoming_msg_img">
                <a class="d-inline-block" style="margin-left:3px">
                    <img src="${members[chat.id].img}" style="width:30px;height:30px;border-radius:70%;"></img>
                </a>
                <p style="font-size:12px">${members[chat.id].name}</p>
            </div>
            <div class="received_msg">
                <div class="received_withd_msg">
                    <p style="float:left">${chat.text}</p>
                    <a style="float:right;" class="d-inline-block" data-bs-toggle="tooltip" data-bs-placement="right" title="" data-bs-original-title="${chat.like.map((id) => members[id].name).join(', ')}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="${chat.like.includes(userID)?'#ff9999':'#ffc0cb'}" class="bi bi-heart-fill" viewBox="0 0 16 16" data-idx="${idx}">
                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                        </svg>
                    </a>
                    <span class="time_date">${timeCalculate(chat.time)}</span></div>
                </div>
            </div>
        </div>`)
    }
    else { // outgoing msg
        $('#chat').append(
        `<div class="outgoing_msg">
            <div class="sent_msg">
                <p style="float:left">${chat.text}</p>
                <i style="float:right;margin-top:5px;margin-left:3px;color:tomato" class="fas fa-times-circle" data-idx="${idx}" data-bs-toggle="modal" data-bs-target="#delete-chat-modal" data-bs-whatever="@mdo"></i>
                <a style="float:right" class="d-inline-block" data-bs-toggle="tooltip" data-bs-placement="left" title="" data-bs-original-title="${chat.like.map((id) => members[id].name).join(', ')}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffc0cb" class="bi bi-heart-fill" viewBox="0 0 16 16" data-idx="${idx}">
                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                    </svg>
                </a>
                <span class="time_date">${timeCalculate(chat.time)}</span> </div>
            </div>
        </div>`)
    }
    tooltipSet();
}

function processData() {
    db.collection('families').doc(docID).collection('answers').where('meetingNumber', '==', String(meetingNumber))
    .get()
    .then((snapshot) => {
        var placeDict = {}, activityDict = {}, availableDatesDict = {}, availableTimeArr = [];
        const latlngs = [];
        snapshot.forEach((doc) => {
            for (var place of doc.data().place) {
                if (place in placeDict) placeDict[place].push(doc.data().userID);
                else placeDict[place] = [doc.data().userID];
            }
            for (var activity of doc.data().activity) {
                if (activity in activityDict) activityDict[activity].push(doc.data().userID);
                else activityDict[activity] = [doc.data().userID];
            }
            
                
            for (var availableDates of doc.data().availableDates){
                availableDates = codeToDate(availableDates);
                if (availableDates in availableDatesDict) availableDatesDict[availableDates].push(doc.data().userID);
                else availableDatesDict[availableDates] = [doc.data().userID];
            }

            if (doc.data().availableTime !== undefined && doc.data().availableTime.length !== 0) {
                availableTime = doc.data().availableTime;
                availableTime = rangeToItems(availableTime);
                availableTimeArr.push({
                    "name": doc.data().userID,
                    "arrTime": availableTime,
                })
                
                
            };
            
            const find = latlngs.find(latlng => latlng.position[0] == doc.data().departure[1] && latlng.position[1] == doc.data().departure[0]);
            if (find) find.id.push(doc.data().userID);
            else {
                latlngs.push({
                    position: [doc.data().departure[1], doc.data().departure[0]],
                    id: [doc.data().userID]
                })
            }
        
        });
        for (var i=0; i<latlngs.length; i++) {
            var marker = new naver.maps.Marker({
                position: new naver.maps.LatLng(latlngs[i].position[0], latlngs[i].position[1]),
                map: map
            });
            var infoWindow = new naver.maps.InfoWindow({
                content: `<p style="padding-top:8px;padding-left:8px;padding-right:8px;color:white;font-size:14px">${latlngs[i].id.map(x => members[x].name).join(', ')}</p>`,
                backgroundColor: "rgba(0,0,0,0.8)",
                borderWidth: 0,
                anchorColor: "rgba(0,0,0,0.8)",
                anchorSize:{width: 10, height: 8}
            });
            markers.push(marker);
            infoWindows.push(infoWindow);


            naver.maps.Event.addListener(markers[i], 'mouseover', getClickHandler(i));
        }
        for (var place in placeDict) {
            var tooltipTitle = place
            placeData.push({
                name: `<a data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title="${placeDict[place].map((id) => members[id].name).join(', ')}">${place}</a>`,
                weight: placeDict[place].length
            });
        }
        for (var activity in activityDict) {
            var tooltipTitle = place
            activityData.push({
                name: `<a data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title="${activityDict[activity].map((id) => members[id].name).join(', ')}">${activity}</a>`,
                weight: activityDict[activity].length
            });
        }
        for (var availableDates in availableDatesDict){
            datesChartData[availableDates] = availableDatesDict[availableDates].map((id) => members[id].name)
        }

        dateChartDraw(datesChartData);
        
        if (availableTimeArr.length !== 0){
            availableTimeArr = availableTimeArr.map(({name, arrTime})=> {return {"name":members[name].name , "arrTime" : arrTime}})
            //console.log(availableTimeArr);
            hostAvailableTime = rangeToItems (hostAvailableTime);
            timeChartDraw(availableTimeArr, hostAvailableTime)
        }else{
            //console.log(availableTimeArr);
            $("#time-card-container").remove();
        }
        
        // if (availableTimeArr){
        //     var IDtoTime = [{name: "박종두", arrTime: [10, 21]}, {name: "박혜수", arrTime: [13, 19]}];
        //     var arrAvailable = [10,22];
            
        // }
        
        
        resize();
        tooltipSet();
    })
}

$(document).ready(function() {
    
    $('.overflow-scroll').on('mousewheel DOMMouseScroll', function(event){

        var delta = Math.max(-1, Math.min(1, (event.originalEvent.wheelDelta || -event.originalEvent.detail)));

        $(this).scrollLeft( $(this).scrollLeft() - ( delta * 20 ) );
        event.preventDefault();

    });

    db.collection('families').where('code', '==', familyCode)
    .get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            docID = doc.id;
            meetings = doc.data().meetings;
            members = doc.data().members;
            for (var member of members) {
                if (member.id == userID) {
                    $('#user-name').text(member.name);
                    $('#user-img').attr('src', member.img);
                }
            }

            var availableDates = meetings[meetingNumber].availableDates.map((el) => codeToDate(el));
            
            for (date in availableDates) {
                datesChartData[availableDates[date]] = []
            }

            hostAvailableTime = meetings[meetingNumber].availableTimes;
            //console.log(hostAvailableTime);

            processData();
            
            db.collection('families').doc(docID).collection('chats').where('meetingNumber', '==', meetingNumber)
            .get().then((snapshot) =>{
                snapshot.forEach((doc) => {
                    $("#chat-placeholder").remove();
                    answerID = doc.id;
                    chats = doc.data();
                    console.log(chats);
                })
                for (var i=0; i<chats.chat.length; i++) drawChat(i);
                if (chats.chat.length === 0){
                    $("#chat").append(
                        `<div id="chat-placeholder" class="text-center text-muted">
                            아직 댓글을 작성한 사람이 없습니다. <br> 가장 먼저 댓글을 달아보세요!
                        </div>
                    `)
                }
            })

            if (meetings[meetingNumber].isPrivate) $('#is-private').append('<span class="text-muted" style="font-size: smaller;"><i class="fas fa-lock me-1"></i> 비공개</span>')
            else $('#is-private').append('<span class="text-muted" style="font-size: smaller;"><i class="fas fa-globe-asia me-1"></i> 공개</span>')

            $('#meeting-name').text(meetings[meetingNumber].name);

            $('#meeting-description').text(meetings[meetingNumber].description);

            db.collection('families').doc(docID).collection('answers').where('meetingNumber', '==', String(meetingNumber)).get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    answers.push(doc.data());
                })
                console.log(answers);
                const answered = [];
                for (var participant of meetings[meetingNumber].participants) {
                    for (var answer of answers) {
                        if (Number(answer.userID) == Number(participant.id)) {
                            answered.push(Number(answer.userID));
                            $('#meeting-participants').append(` <a class="d-inline-block" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title=${members[participant.id].name}>
                                                            <img src="${members[participant.id].img}" style="width:30px;height:30px;border-radius:70%;margin-bottom:2px;"></img>
                                                        </a>`);
                        }
                    }
                }
                for (var participant of meetings[meetingNumber].participants) {
                    if (!answered.includes(Number(participant.id))) {
                        $('#meeting-participants').append(` <a class="d-inline-block" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title="${members[participant.id].name}">
                                                            <img src="${members[participant.id].img}" style="width:30px;height:30px;border-radius:70%;margin-bottom:2px;filter:brightness(0.3);opacity:0.4;"></img>
                                                        </a>`);
                    }
                }
                tooltipSet();
            })

            var meetingTags;
            if (meetings[meetingNumber].meetingPeriod.day == 0) meetingTags = `<span class="badge rounded-pill bg-light text-dark">${meetings[meetingNumber].meetingPeriod.hr}시간</span> <span style="font-size: smaller;">동안</span>`;
            else if (meetings[meetingNumber].meetingPeriod.day == 1) meetingTags = `<span class="badge rounded-pill bg-light text-dark">하루</span> <span style="font-size: smaller;">종일</span>`;
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

            // setDateDisabled(meetings[meetingNumber].availableDates)
        });
        bindEvents();
    });
});


function dateChartDraw(chartData) {

    var ctx = $('#dateChart');
    
    var numberData = [];
    var labelData = [];
    var newChartData = {}

    for (i in Object.keys(chartData)){
        var date = new Date(Object.keys(chartData)[i])
        var str = `${date.getMonth()+1}월 ${date.getDate()}일`
        newChartData[str] = chartData[Object.keys(chartData)[i]]
    }

    
    labelData = Object.keys(chartData).map((el) => {
        var date = new Date(el)
        var str = `${date.getMonth()+1}월 ${date.getDate()}일`
        chartData[str] = chartData[el]
        return `${date.getMonth()+1}월 ${date.getDate()}일`
    });
    for (date of Object.keys(chartData)){
        // numberData.push(chartData[labelData[i]].length);
        numberData.push(chartData[date].length);
        // numberToParticipants[String(chartData[date].length)] = chartData[date];
    }


    var myBarChart = new Chart(ctx, {
        responsive: true,
        type: 'bar',
        data: {
            labels: labelData,
            datasets: [{
                label: 'available',
                backgroundColor: 'rgb(160, 207, 255)',
                borderColor: 'rgb(160, 207, 255)',
                data: numberData,
                maxBarThickness: 20,
            }]
        },
    
        // Configuration options go here
        options: {
            responsive: true,
            maintainAspectRatio: false,
            // legendCallback: function(chart) {
            //     return ` <span style="-webkit-transform:rotate(90deg);">짱!</span> `
            // },
            tooltips: {
                custom: function(tooltip) {
                    if (!tooltip) return;
                    // disable displaying the color box;
                    tooltip.displayColors = false;
                  },
                bodyAlign: "center",
                titleAlign: "center",
                yPadding: 10,
                bodyFontSize: 14,
                callbacks: {
                    label: function(tooltipItem) {
                        if (tooltipItem.yLabel > 0){
                            return newChartData[tooltipItem.xLabel].join(" ,")
                        }
                        return ""
                    },
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        display: false
                    },
                    gridLines: {
                        display:false
                    }
                }],
                xAxes: [{
                    ticks:{
                        fontSize: 13
                    },
                    gridLines: {
                        display:false
                    }
                }],
            },
            legend: {
                display: false
                // position: "left",
              },
        }
    });
    // ctx.html(myBarChart.generateLegend());
    
}


function codeToDate(codeObj) {
    return new Date(codeObj["seconds"]*1000)
}

// var arrEx = ["12:00 AM", "09:00 PM"];
// rangeToItems(arrEx);

function rangeToItems(arr){
    var resArr = [];
    if (arr[0] === "12:00 AM") resArr[0] = 0;
    else if (arr[0].slice(6, 8) === "AM") resArr[0] = Number(arr[0].slice(0, 2))
    else if (arr[0].slice(6, 8) === "PM") resArr[0] = Number(arr[0].slice(0, 2)) + 12;

    if (arr[1] === "12:00 AM") resArr[1] = 0;
    else if (arr[1].slice(6, 8) === "AM") resArr[1] = Number(arr[1].slice(0, 2))
    else if (arr[1].slice(6, 8) === "PM") resArr[1] = Number(arr[1].slice(0, 2)) + 12;

    return resArr;
}



function makingTimeData(IDtoTime, arrAvailable){
        // returns inputData, dictToAns (t label to answer list)
       // IDtoTime = [{name: "박종두", arrTime: [10, 21]}, {name: "박혜수", arrTime: [13, 19]}]


       // arrAvailable = [10,22];
       // dictToAns = {10: ["박종두"], 13: ["박종두", "박혜수"], 19:["박종두"], 20:["박종두"], 21:[], 22:[]}
///     // 다 숫자 형식이라고 침 (0 ~ 23)

    // var inputData = [{
    //     "t" : arrAvailable[0],
    //     "y" : 0
    // }];

    var inputData = [];

    var dictToAns = {};

    var arrSrt = IDtoTime.map(({name, arrTime}) => arrTime[0]);
    var arrEnd = IDtoTime.map(({name, arrTime}) => arrTime[1]);

    if (arrSrt.filter((el)=> el === arrAvailable[0]).length !== 0) {
        const obj = {};
        obj.t = arrAvailable[0];
        obj.y = arrSrt.filter((el)=> el === arrAvailable[0]).length;
        inputData.push(obj);
        var arrName = IDtoTime.filter(({name, arrTime}) => arrTime[0] === arrAvailable[0])
                            .map((el)=>el.name)
                            // .join(', ');
        dictToAns[String(arrAvailable[0])] = arrName; 
    } else {
        const obj = {};
        obj.t = arrAvailable[0];
        obj.y = 0;
        inputData.push(obj);
        dictToAns[String(arrAvailable[0])] = []
    }
    
    for (let i = arrAvailable[0] + 1; i < arrAvailable[1]+1 ; i ++){

        var numberPeople = inputData.filter(({t})=> t === i-1)[0].y;
    
        var arrName = dictToAns[String(i-1)];
        console.log(dictToAns)
        if (arrSrt.filter((el) => el === i).length !== 0){
            numberPeople += arrSrt.filter((el)=> el === i).length;
            arrName = arrName.concat(IDtoTime.filter(({name, arrTime}) => arrTime[0] === i)
                            .map((el)=>el.name));
        }

        if (arrEnd.filter((el) => el === i).length !== 0){
            numberPeople -= arrEnd.filter((el)=> el === i).length;
            var newArrName = IDtoTime.filter(({name, arrTime}) => arrTime[1] === i)
                            .map((el)=>el.name)
            
            arrName = arrName.filter((el) => newArrName.filter((element) => element === el).length !== 0);
        }
        
        inputData.push({
            "t" : i,
            "y" : numberPeople, 
        })
        console.log(inputData)
        dictToAns[String(i)] = arrName;
    }

    inputData = inputData.map(function({t,y}){
        var date = new Date();
        date.setHours(t);
        
        return {"t":date.setMinutes(0), "y":y}
    })
    return [inputData, dictToAns]
}

function timeChartDraw(IDtoTime, arrAvailable) {
    var ctx = $('#timeChart');
    ctx.height = 280;

    // var IDtoTime = [{name: "박종두", arrTime: [10, 21]}, {name: "박혜수", arrTime: [13, 19]}];
    // var arrAvailable = [10,22];

    srtTime = new Date() 
    srtTime.setHours(arrAvailable[0]-2);
    srtTime.setMinutes(0);
    endTime = new Date() 
    endTime.setHours(arrAvailable[1]);
    endTime.setMinutes(0);
    
    var inputData = {
        datasets: [{
            label: 'Demo',
            data: makingTimeData(IDtoTime, arrAvailable)[0],
            lineTension: 0,
            backgroundColor: 'rgba(163, 206, 255, 0.5)',
            borderColor: 'rgb(153, 206, 255)',
        }]
      }

    console.log(inputData);
    var dictToAns = makingTimeData(IDtoTime, arrAvailable)[1];

    var chart = new Chart(ctx, {
        type: 'line',
        data: inputData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            tooltips: {
                custom: function(tooltip) {
                    if (!tooltip) return;
                    // disable displaying the color box;
                    tooltip.displayColors = false;
                  },
                bodyAlign: "center",
                titleAlign: "center",
                yPadding: 10,
                bodyFontSize: 14,
                callbacks: {
                    title: function(tooltipItem, data) {
                        return "";
                        if (tooltipItem.yLabel > 0){
                            return tooltipItem.xLabel;
                        }
                        // var date = new Date(tooltipItem.xLabel);
                        // var hrs = date.getHours()
                        
                        // if (hrs < 12) return `${hrs} AM`;
                        // else if (hrs === 12) return `12 PM`;
                        // else return `${hrs-12} PM`;
                    },
                    label: function(tooltipItem, data) {
                        if (tooltipItem.yLabel > 0){
                            var date = new Date(tooltipItem.xLabel);
                            return dictToAns[date.getHours()].join(", ");
                            // return dictToAns[data.datasets.data[tooltipItem.datasetIndex].t.getHours()].join(" ,")
                        }
                    },
                }
            },
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'hour',
                        stepSize: 2,
                    },
                    ticks:{
                        min: srtTime,
                        max: endTime,
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        display: false,
                        stepSize : 5,
                    },
                    gridLines: {
                        display: false
                    },
                }]
            },
            legend: {
                display: false
                // position: "left",
            },
            
        }
    });
}

$('#logout-button').click(() => {
    localStorage.removeItem('family-code');
    localStorage.removeItem('family-id');
    localStorage.removeItem('id');
    localStorage.removeItem('pw');
    localStorage.removeItem('real-family-id');

    location.href = "index.html";
})