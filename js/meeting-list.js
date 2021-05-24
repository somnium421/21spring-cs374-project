const familyCode = "00AB8"
var userID = 0
const placeData = [], activityData = [], markers = [], infoWindows = [], latlngs = [], meetingUserPart = [];
var meetings, members, chats, docID, answerID;

// duedate 지나면 결과확인 되기 -> 됨. 생성에 문제가근데, 그 전에는 duedate 남은거 받아서 표시 -> 됨. , userID가 참가자중 없는데 private이면 안보여야함. private 이면 색깔 다르게.
// tag 중에는 제일 인기가 많은거 나오게??
// host가 들어가면 보이는 화면이 다른가?


// $(document).ready(function () {
//     $('head').append('<style type="text/css"> #meeting-list {height: ' + ($('.card-body').height()) + 'px;}</style>');

//     if ($('.meeting-card').css("display") === "none") $('.meeting-card').show();
// });

// $(document).ready(function () {
//     $('head').append('<style type="text/css"> #meeting-list {height: ' + ($('.card-body').height()) + 'px;}</style>');

//     if ($('.meeting-card').css("display") === "none") $('.meeting-card').show();
// });





function processData(meetingNumber, htmlStr) {
    // db.collection('families').doc(docID).collection('answers').where('meetingNumber', '==', meetingNumber)
    console.log(docID);
    db.collection('families').doc(docID).collection("answers").where('meetingNumber', '==', meetingNumber)
    .get()
    .then((snapshot) => {
        var placeDict = {}, activityDict = {};
        
        snapshot.forEach((doc) => {
            for (var place of doc.data().place) {
                if (place in placeDict) placeDict[place].push(doc.data().userID);
                else placeDict[place] = [doc.data().userID];
            }
            for (var activity of doc.data().activity) {
                if (activity in activityDict) activityDict[activity].push(doc.data().userID);
                else activityDict[activity] = [doc.data().userID];
            }
            
            if (doc.data().userID === userID) meetingUserPart.push(meetingNumber);
            
        });
        if (meetingUserPart.filter((el) => el === meetingNumber).length === 0) $("#meeting-list-not-part").append(htmlStr);
        else $("#meeting-list-part").append(htmlStr);
    })
}


$(document).ready(function() {
    $('head').append('<style type="text/css"> #meeting-list {height: ' + ($('.card-body').height()) + 'px;}</style>');
    db.collection('families').where('code', '==', familyCode)
    .get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            docID = doc.id;
            meetings = doc.data().meetings;
            members = doc.data().members;

            for (meetingNumber = 0; meetingNumber < meetings.length; meetingNumber ++){

                // if private and userID is not in the participants list, ignore.
                if (meetings[meetingNumber].isPrivate && meetings[meetingNumber].participants.filter(({id}) => id === userID).length === 0) continue;

                var html_isPrivate, html_dueDate, html_meetingName, html_meetingDescription, html_meetingParticipants, html_meetingTags, html_button;

                if (meetings[meetingNumber].isPrivate) html_isPrivate = '<span class="text-muted" style="font-size: smaller;"><i class="fas fa-lock me-1"></i> 비공개</span>'
                else html_isPrivate = '<span class="text-muted" style="font-size: smaller;"><i class="fas fa-globe-asia me-1"></i> 공개</span>'
                
                var meetingDue = new Date(meetings[meetingNumber].dueDate);
                var now = new Date();

                console.log(meetingDue, now);
                if (meetingDue.getDate() > now.getDate()) {
                    html_dueDate = `<span class="text-muted" style="font-size: smaller;"><i class="fa fa-ellipsis-h" aria-hidden="true"></i> &nbsp;참여 마감 <span class="text-primary">${meetingDue.getDate()-now.getDate()}</span>일 전</span>`
                    html_button = `<button class="btn btn-outline-primary rounded-pill participate" id="${meetingNumber}">참여 신청 &nbsp; <i class="fa fa-chevron-right" aria-hidden="true"></i></button>`
                }
                else {
                    html_dueDate = `<span class="text-muted" style="font-size: smaller;"><i class="fa fa-check" aria-hidden="true"></i> &nbsp;참여 마감</span>`
                    html_button = `<button class="btn btn-primary rounded-pill result" id="${meetingNumber}" > 결과 확인 &nbsp; <i class="fa fa-chevron-right" aria-hidden="true"></i></button>`
                }

                html_meetingName = meetings[meetingNumber].name;
    
                html_meetingDescription = meetings[meetingNumber].description;
    
                html_meetingParticipants = ``;
                for (var participant of meetings[meetingNumber].participants) {
                    html_meetingParticipants = html_meetingParticipants + ` <a href="#" class="d-inline-block" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title=${participant.name}>
                                                                                <img src="${members[participant.id].img}" style="width:30px;height:30px;border-radius:70%;opacity:${(Math.random(1)<0.5)?0.5:1}"></img>
                                                                            </a>`;
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
                html_meetingTags = meetingTags;

                var htmlStr = `<div class="card meeting-card mb-3" style="border-radius: 10px;">
                                    <div class="card-header">   
                                        <div class="d-flex justify-content-between">
                                            ${html_isPrivate}
                                            ${html_dueDate}
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between mb-2">
                                            <div>
                                                <h5 class="card-title fw-bold">${html_meetingName}</h5> 
                                            </div>
                                            <div>
                                                <h5>${html_meetingTags}</h5>
                                            </div>
                                        </div>
                                        <p class="card-text">${html_meetingDescription}</p>
                                        <div>${html_meetingParticipants}</div>
                                        <div class="btn-toolbar justify-content-between mt-4" role="toolbar" aria-label="Toolbar with button groups">
                                            <div class="btn-group" role="group" aria-label="First group">
                                                <h4><span class="badge rounded-pill bg-light text-dark"><i class="fa fa-calendar" aria-hidden="true"></i> &nbsp; 2021.05.19 - 2021.05.20</span></h4>
                                            </div>
                                            <div>
                                                ${html_button}
                                            </div>
                                        </div>
                                    </div>
                                </div>`
                $("#meeting-list").append(htmlStr)
                console.log(meetings[meetingNumber].participants)
                console.log(meetingUserPart)

                processData(meetingNumber, htmlStr);

                
            }
        
        });
    });
});
