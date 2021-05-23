const familyCode = "00AB8", meetingNumber = 0, userID = 0;
const placeData = [], activityData = [], markers = [], infoWindows = [], latlngs = []
var meetings, members, chats,  docID, answerID;
var hostAvailableDates = {};
var datesChartData = {};

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
    db.collection('families').doc(docID).collection('answers').where('meetingNumber', '==', meetingNumber)
    .get()
    .then((snapshot) => {
        var placeDict = {}, activityDict = {}, availableDatesDict = {};
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
                content: `<p style="padding-top:10px;padding-left:10px;padding-right:10px;">${latlngs[i].id.map(x => members[x].name).join(', ')}</p>`
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

        chartDraw(datesChartData)
        
        resize();
        tooltipSet();
    })
}

$(document).ready(function() {
    db.collection('families').where('code', '==', familyCode)
    .get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            docID = doc.id;
            meetings = doc.data().meetings;
            members = doc.data().members;
            var availableDates = meetings[meetingNumber].availableDates.map((el) => codeToDate(el));
            
            for (date in availableDates) {
                datesChartData[availableDates[date]] = []
            }
            

            processData();
            
            db.collection('families').doc(docID).collection('chats').where('meetingNumber', '==', meetingNumber)
            .get().then((snapshot) =>{
                snapshot.forEach((doc) => {
                    answerID = doc.id;
                    chats = doc.data();
                    //console.log(chats);
                })
                for (var i=0; i<chats.chat.length; i++) drawChat(i);
            })

            if (meetings[meetingNumber].isPrivate) $('#is-private').append('<span class="text-muted" style="font-size: smaller;"><i class="fas fa-lock me-1"></i> 비공개</span>')
            else $('#is-private').append('<span class="text-muted" style="font-size: smaller;"><i class="fas fa-globe-asia me-1"></i> 공개</span>')

            $('#meeting-name').text(meetings[meetingNumber].name);

            $('#meeting-description').text(meetings[meetingNumber].description);

            for (var participant of meetings[meetingNumber].participants) {
                $('#meeting-participants').append(` <a href="#" class="d-inline-block" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title=${participant.name}>
                                                        <img src="${members[participant.id].img}" style="width:30px;height:30px;border-radius:70%;opacity:${(Math.random(1)<0.5)?0.5:1}"></img>
                                                    </a>`);
            }

            var meetingTags;
            if (meetings[meetingNumber].meetingPeriod.day == 0) meetingTags = `<span class="badge rounded-pill bg-light text-dark">${meetings[meetingNumber].meetingPeriod.hour}시간</span> <span style="font-size: smaller;">동안</span>`;
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


function chartDraw(chartData) {

    var ctx = $('#timeChart');
    
    var numberData = [];
    var numberToParticipants = { "0":[],"10":["정창식", "김솔"], "5": ["박혜수"], "2":["박종두"]};
    var labelData = ['January', 'February', 'March', 'April'];

    labelData = Object.keys(chartData).map((el) => {
        var date = new Date(el)
        return `${date.getMonth()+1}/${date.getDate()}`
    });
    for (date of Object.keys(chartData)){
        // numberData.push(chartData[labelData[i]].length);
        numberData.push(chartData[date].length);
        numberToParticipants[String(chartData[date].length)] = chartData[date];
    }



    // // draws a rectangle with a rounded top
    // Chart.helpers.drawRoundedTopRectangle = function(ctx, x, y, width, height, radius) {
    //     ctx.beginPath();
    //     ctx.moveTo(x + radius, y);
    //     // top right corner
    //     ctx.lineTo(x + width - radius, y);
    //     ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    //     // bottom right   corner
    //     ctx.lineTo(x + width, y + height);
    //     // bottom left corner
    //     ctx.lineTo(x, y + height);
    //     // top left   
    //     ctx.lineTo(x, y + radius);
    //     ctx.quadraticCurveTo(x, y, x + radius, y);
    //     ctx.closePath();
    // };
    
    // Chart.elements.RoundedTopRectangle = Chart.elements.Rectangle.extend({
    //     draw: function() {
    //     var ctx = this._chart.ctx;
    //     var vm = this._view;
    //     var left, right, top, bottom, signX, signY, borderSkipped;
    //     var borderWidth = vm.borderWidth;
    
    //     if (!vm.horizontal) {
    //         // bar
    //         left = vm.x - vm.width / 2;
    //         right = vm.x + vm.width / 2;
    //         top = vm.y;
    //         bottom = vm.base;
    //         signX = 1;
    //         signY = bottom > top? 1: -1;
    //         borderSkipped = vm.borderSkipped || 'bottom';
    //     } else {
    //         // horizontal bar
    //         left = vm.base;
    //         right = vm.x;
    //         top = vm.y - vm.height / 2;
    //         bottom = vm.y + vm.height / 2;
    //         signX = right > left? 1: -1;
    //         signY = 1;
    //         borderSkipped = vm.borderSkipped || 'left';
    //     }
    
    //     // Canvas doesn't allow us to stroke inside the width so we can
    //     // adjust the sizes to fit if we're setting a stroke on the line
    //     if (borderWidth) {
    //         // borderWidth shold be less than bar width and bar height.
    //         var barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));
    //         borderWidth = borderWidth > barSize? barSize: borderWidth;
    //         var halfStroke = borderWidth / 2;
    //         // Adjust borderWidth when bar top position is near vm.base(zero).
    //         var borderLeft = left + (borderSkipped !== 'left'? halfStroke * signX: 0);
    //         var borderRight = right + (borderSkipped !== 'right'? -halfStroke * signX: 0);
    //         var borderTop = top + (borderSkipped !== 'top'? halfStroke * signY: 0);
    //         var borderBottom = bottom + (borderSkipped !== 'bottom'? -halfStroke * signY: 0);
    //         // not become a vertical line?
    //         if (borderLeft !== borderRight) {
    //         top = borderTop;
    //         bottom = borderBottom;
    //         }
    //         // not become a horizontal line?
    //         if (borderTop !== borderBottom) {
    //         left = borderLeft;
    //         right = borderRight;
    //         }
    //     }
    
    //     // calculate the bar width and roundess
    //     var barWidth = Math.abs(left - right);
    //     var roundness = this._chart.config.options.barRoundness || 0.5;
    //     var radius = barWidth * roundness * 0.5;
    
    //     // keep track of the original top of the bar
    //     var prevTop = top;
    
    //     // move the top down so there is room to draw the rounded top
    //     top = prevTop + radius;
    //     var barRadius = top - prevTop;
    
    //     ctx.beginPath();
    //     ctx.fillStyle = vm.backgroundColor;
    //     ctx.strokeStyle = vm.borderColor;
    //     ctx.lineWidth = borderWidth;
    
    //     // draw the rounded top rectangle
    //     Chart.helpers.drawRoundedTopRectangle(ctx, left, (top - barRadius + 1), barWidth, bottom - prevTop, barRadius);
    
    //     ctx.fill();
    //     if (borderWidth) {
    //         ctx.stroke();
    //     }
    
    //     // restore the original top value so tooltips and scales still work
    //     top = prevTop;
    //     },
    // });

    // Chart.defaults.roundedBar = Chart.helpers.clone(Chart.defaults.bar);

    // Chart.controllers.roundedBar = Chart.controllers.bar.extend({
    // dataElementType: Chart.elements.RoundedTopRectangle
    // });


    var myBarChart = new Chart(ctx, {
        responsive: true,
        type: 'bar',
        data: {
            labels: labelData,
            datasets: [{
                label: 'available',
                backgroundColor: 'rgb(160, 207, 255)',
                borderColor: 'rgb(160, 207, 255)',
                data: numberData
            }]
        },
    
        // Configuration options go here
        options: {
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
                            return numberToParticipants[tooltipItem.yLabel].join(" ,")
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
              },
        }
    });
}


function codeToDate(codeObj) {
    return new Date(codeObj["seconds"]*1000)
}
