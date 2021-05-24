const familyCode = localStorage.getItem("family-code") //"00AB8"
const userID = localStorage.getItem("family-id") // "0"

console.log(familyCode, userID);

localStorage.removeItem("meeting-number");

const placeData = [], activityData = [], markers = [], infoWindows = [], latlngs = [], meetingUserPart = [], answers = [];
var meetings, members, chats, docID, answerID, isAssign;

isAssign = (familyCode !== null);
console.log(isAssign);
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





function processData(meetingNumber, html_isPrivate, html_dueDate, html_meetingName, html_meetingDescription, html_meetingParticipants, html_meetingDates, html_meetingTags, html_button, isPrivate) {
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
            answers.push(doc.data());
            if (doc.data().userID === userID) meetingUserPart.push(meetingNumber);
            
        });

       
        const answered = [];
        for (var participant of meetings[meetingNumber].participants) {
            for (var answer of answers) {
                if (answer.userID == participant.id) {
                    answered.push(answer.userID);
                    html_meetingParticipants = html_meetingParticipants + ` <a class="d-inline-block" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title=${participant.name}>
                                                    <img src="${members[participant.id].img}" style="width:30px;height:30px;border-radius:70%;margin-bottom:2px;"></img>
                                                </a>`;
                }
            }
        }
        for (var participant of meetings[meetingNumber].participants) {
            if (!(participant.id in answered)) html_meetingParticipants = html_meetingParticipants + ` <a class="d-inline-block" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title=${participant.name}>
                                                    <img src="${members[participant.id].img}" style="width:30px;height:30px;border-radius:70%;margin-bottom:2px;filter:brightness(0.5);"></img>
                                                </a>`;
        }

        var col = "";
        var htmlStr = `<div class="card meeting-card ${col} mb-3" style="border-radius: 10px;">
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
                                                <h4>${html_meetingDates}</h4>
                                            </div>
                                            <div>
                                                ${html_button}
                                            </div>
                                        </div>
                                    </div>
                                </div>`

        if (isPrivate) {
            $("span.rounded-pill").css("background-color: rgb(218, 218, 218);")
            col = "bg-light";
        }
        
        $("#meeting-list").append(htmlStr)

        if (meetingUserPart.filter((el) => el === meetingNumber).length === 0) $("#meeting-list-not-part").append(htmlStr);
        else $("#meeting-list-part").append(htmlStr);

        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
            })

    })
}


$(document).ready(function() {
    
    $('head').append('<style type="text/css"> #meeting-list {height: ' + ($('.card-body').height()) + 'px;}</style>');
    
    if (isAssign){
        console.log("tree")
        db.collection('families').where('code', '==', familyCode)
        .get()
        .then((snapshot) => {
            if (snapshot.length === 0){
                $("#meeting-list").append(`<p class="card-text text-muted mt-3">아직 모임계획을 세우지 않으셨습니다. <a href="load-family-tree.html" class="card-link">새 모임 만들기</a>
                <br>
                하단 + 버튼을 눌러서 새 모임을 만들 수 있습니다.
                <a href="load-family-tree.html" class="card-link card-text fw-light eng-cap">Add a new meeting plan.</a>
            </p>`)
                $("#meeting-list, #meeting-list-part, #meeting-list-not-part, #family-tree").attr("class", "card-body overflow-auto text-center");
                $(".meeting-card").attr("class", "card h-100 shadow pb-3 bg-light");
            }
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
    
                for (meetingNumber = 0; meetingNumber < meetings.length; meetingNumber ++){
    
                    var isPrivate = meetings[meetingNumber].isPrivate
                    // if private and userID is not in the participants list, ignore.
                    if (isPrivate && meetings[meetingNumber].participants.filter(({id}) => id === userID).length === 0) continue;
    
                    var html_isPrivate, html_dueDate, html_meetingName, html_meetingDescription, html_meetingParticipants, html_meetingTags, html_button, html_meetingDates;
    
                    if (meetings[meetingNumber].isPrivate) html_isPrivate = '<span class="text-muted" style="font-size: smaller;"><i class="fas fa-lock me-1"></i> 비공개</span>'
                    else html_isPrivate = '<span class="text-muted" style="font-size: smaller;"><i class="fas fa-globe-asia me-1"></i> 공개</span>'
                    
                    var meetingDue = new Date(meetings[meetingNumber].dueDate);
                    var now = new Date();
    
                    console.log(meetingDue, now);
                    if (meetingDue.getDate() > now.getDate()) {
                        html_dueDate = `<span class="text-muted" style="font-size: smaller;"><i class="fa fa-ellipsis-h" aria-hidden="true"></i> &nbsp;참여 마감 <span class="text-primary">${meetingDue.getDate()-now.getDate()}</span>일 전</span>`
                        html_button = `<button class="btn btn-outline-primary rounded-pill participate" id="meeting-${meetingNumber}">참여 신청 &nbsp; <i class="fa fa-chevron-right" aria-hidden="true"></i></button>`
                    }
                    else {
                        html_dueDate = `<span class="text-muted" style="font-size: smaller;"><i class="fa fa-check" aria-hidden="true"></i> &nbsp;참여 마감</span>`
                        html_button = `<button class="btn btn-primary rounded-pill result" id="meeting-${meetingNumber}" > 결과 확인 &nbsp; <i class="fa fa-chevron-right" aria-hidden="true"></i></button>`
                    }
    
                    html_meetingDates =``
    
    
                    if (meetings[meetingNumber].meetingPeriod.day > 1 && meetings[meetingNumber].availableDates.length == meetings[meetingNumber].meetingPeriod.day) {
                        var time1 = meetings[meetingNumber].availableDates[0].toDate(), time2 = meetings[meetingNumber].availableDates[meetings[meetingNumber].availableDates.length-1].toDate();
                        html_meetingDates = `<h4><span class="badge rounded-pill bg-light text-dark"><i class="fa fa-calendar" aria-hidden="true"></i> 
                            &nbsp; ${time1.getYear()+1900}.${time1.getMonth()+1}.${time1.getDate()} ~ ${time2.getYear()+1900}.${time2.getMonth()+1}.${time2.getDate()} </span></h4>`;
                    }
                    //else {
                    else if (meetings[meetingNumber].meetingPeriod.day <= 1 && meetings[meetingNumber].availableDates.length == 1) {
                        var time = meetings[meetingNumber].availableDates[0].toDate()
                        html_meetingDates  =`<h4><span class="badge rounded-pill bg-light text-dark"><i class="fa fa-calendar" aria-hidden="true"></i> 
                            &nbsp; ${time.getYear()+1900}.${time.getMonth()+1}.${time.getDate()} </span></h4>`;
                    }
    
                    html_meetingName = meetings[meetingNumber].name;
        
                    html_meetingDescription = meetings[meetingNumber].description;
        
                    html_meetingParticipants = ``;
                    
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
                    html_meetingTags = meetingTags;
    
                    
                    processData(meetingNumber, html_isPrivate, html_dueDate, html_meetingName, html_meetingDescription, 
                        html_meetingParticipants, html_meetingDates, html_meetingTags, html_button, isPrivate);
    
                }
            
            });

        });
    } else {
        //meeting list
        $("#meeting-list, #meeting-list-part, #meeting-list-not-part, #family-tree").attr("class", "card-body overflow-auto text-center")
        $(".meeting-card .meeting-card-part .meeting-card-not-part").attr("class", "card h-100 shadow pb-3 bg-light")
        $("#createNewMeeting").attr("class", "btn btn-primary rounded-pill btn-lg shadow disabled")
        $("#meeting-list, #meeting-list-part, #meeting-list-not-part").append(`<p class="card-text text-muted mt-3">가족 관계도를 생성하고 서비스를 이용해보세요! <a href="load-family-tree.html" class="card-link">생성하기</a>
                    <br>
                    <a href="load-family-tree.html" class="card-link card-text fw-light eng-cap">Make a new family tree.</a>
                </p>`
        )
    }

    $(document).on('click', '.result', function() {
        meetingNumber = Number($(this).attr('id').slice(8,9));
        localStorage.setItem("meeting-number", meetingNumber);
        location.href = 'result.html';
    });

    $(document).on('click','.participate', function() {
        meetingNumber = Number($(this).attr('id').slice(8,9));
        localStorage.setItem("meeting-number", meetingNumber);
        location.href = 'participate.html';
    });

    if ($("#meeting-list-part").children().length === 0){
        $("#meeting-list-part").append(`<p class="card-text text-muted mt-3">아직 참여한 모임이 없습니다. 
                <br>
                우측에 있는 여러 모임에 참여해보는건 어떨까요?
                <br><br>
                하단 + 버튼을 눌러서 새 모임을 만들 수 있습니다. <a href="load-family-tree.html" class="card-link">새 모임 만들기</a>
                <br>
                <a href="load-family-tree.html" class="card-link card-text fw-light eng-cap">Add a new meeting plan.</a>
            </p>`)
                $("#meeting-list-part").attr("class", "card-body overflow-auto text-center");
                $(".meeting-card-part").attr("class", "card h-100 shadow pb-3 bg-light");
    }
});

console.log('hello');
console.log(localStorage.getItem('familyCode'));
console.log(localStorage.getItem('userID'));


$('#logout-button').click(() => {
    localStorage.removeItem('family-code');
    localStorage.removeItem('family-id');
    localStorage.removeItem('id');
    localStorage.removeItem('pw');
    location.href = "login.html";
})
