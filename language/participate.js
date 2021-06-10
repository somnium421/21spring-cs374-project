if(localStorage.getItem('lang')== 'en'){
  $('#eng').attr('selected',true);
  $('#kor').removeAttr('selected');
}
else{
  $('#kor').attr('selected',true);
  $('#eng').removeAttr('selected');
}

i18next.init(
    {
      lng: localStorage.getItem('lang'),
      debug: true,
      resources: {
        ko: {
          translation: {
            home: "홈",
            family: "우리가족",
            meeting: "모임",
            logout: "로그아웃",
            logoutQ: "로그아웃 하시겠습니까",
            close: "닫기",
            participateTitle: "모임 참여 신청하기",
            choosePlace: "장소 선택",
            chooseActivity: "활동 선택",
            add: "추가",
            chooseAcco: "숙소",
            ac1: "호텔",
            ac2: "펜션",
            ac3: "리조트",
            ac4: "에어비앤비",
            chooseDeparture:"출발 장소",
            chooseTrans: "이동 수단 선택",
            trans1: "대중교통",
            trans2: "자가용",
            trans3: "도보",
            trans4: "자전거",
            next: "다음",
            chooseDate: "가능한 날짜",
            availabletime: "가능한 시간대",
            participate: "참여하기",
            step2D: "<b>도로명 주소</b>나 <b>건물 이름</b>을 작성하고 <b>엔터</b>를 눌러주세요.<br>주소가 여러 개 제시되면 그 중 <b>해당하는 주소</b>를 클릭해주세요.",
            tag: "태그",
            step1D: "는 <b>모임 개설자 혹은 참여자가 작성한 선택지</b>입니다. <br> 각 태그를 <b>클릭</b>해서 <b>선택 / 취소</b>하실 수 있습니다.",
            step1D2: "장소 혹은 활동이 정해지지 않은 모임의 경우,",
            step1D3: "버튼을 눌러 <b>추가</b>하실 수 있습니다.",
          }
        },
        en: {
          translation: {
            home: "Home",
            family: "My Family",
            meeting: "Meetings",
            logout: "Log out",
            logoutQ: "Do you want to log out?",
            close: "Close",
            participateTitle: "Participate in the meeting",
            choosePlace: "Place selection",
            chooseActivity: "Activity selection",
            add: "Add",
            chooseAcco: "Accommodation",
            ac1: "Hotel",
            ac2: "Pension",
            ac3: "Resort",
            ac4: "Airbnb",
            chooseDeparture:"Departure place",
            chooseTrans: "Transportation selection",
            trans1: "Public Trans",
            trans2: "   Car   ",
            trans3: "  Walk  ",
            trans4: " Bicycle ",
            next: "Next",
            chooseDate: "Available dates",
            availabletime: "Available time",
            participate: "Participate",
            step2D: "Fill in <b>Street Name Address</b> or <b>Building Name</b> and press <b>Enter</b><br>If multiple addresses are presented, Click the <b>appropriate address</b>.",
            tag: "tag",
            step1D: "is <b>selection made by the meeting founder or participant</b>. <br> You can <b>select/cancel</b> each tag by <b>click</b>.",
            step1D2: "For meetings with no fixed location or activity,",
            step1D3: "you can <b>Add</b> by clicking the button.",
          }
        }
      }
    },
    function(err, t) {
      if (err) {
        console.error(err);
      } else {
        updateContent();
      }
    }
);

function updateContent() {
  document.getElementById("pagetitleParticipate").innerHTML = i18next.t("participateTitle");
  document.getElementById("tabHome").innerHTML = i18next.t("home");
  document.getElementById("tabFamily").innerHTML = i18next.t("family");
  document.getElementById("tabMeeting").innerHTML = i18next.t("meeting");
  document.getElementById("tabLogout").innerHTML = i18next.t("logout");
  document.getElementById("close").innerHTML = i18next.t("close");
  document.getElementById("logout-button").innerHTML = i18next.t("logout");
  document.getElementById("exampleModalLabel").innerHTML = i18next.t("logoutQ");
  document.getElementById("choosePlace").innerHTML = i18next.t("choosePlace");
  document.getElementById("chooseActivity").innerHTML = i18next.t("chooseActivity");
  document.getElementById("activity-add").innerHTML = i18next.t("add");
  document.getElementById("place-add").innerHTML = i18next.t("add");
  document.getElementById("step1-submit").innerHTML = i18next.t("next");
  document.getElementById("chooseAcco").innerHTML = i18next.t("chooseAcco");
  document.getElementById("ac1").innerHTML = i18next.t("ac1");
  document.getElementById("ac2").innerHTML = i18next.t("ac2");
  document.getElementById("ac3").innerHTML = i18next.t("ac3");
  document.getElementById("ac4").innerHTML = i18next.t("ac4");
  document.getElementById("chooseDeparture").innerHTML = i18next.t("chooseDeparture");
  document.getElementById("chooseTrans").innerHTML = i18next.t("chooseTrans");
  document.getElementById("trans1").innerHTML = i18next.t("trans1");
  document.getElementById("trans2").innerHTML = i18next.t("trans2");
  document.getElementById("trans3").innerHTML = i18next.t("trans3");
  document.getElementById("trans4").innerHTML = i18next.t("trans4");
  document.getElementById("step2-submit").innerHTML = i18next.t("next");
  document.getElementById("chooseDate").innerHTML = i18next.t("chooseDate");
  document.getElementById("availabletime").innerHTML = i18next.t("availabletime");
  document.getElementById("submit-button").innerHTML = i18next.t("participate");
  document.getElementById("step2D").innerHTML = i18next.t("step2D");
  document.getElementById("tagD").innerHTML = i18next.t("tag");
  document.getElementById("step1D").innerHTML = i18next.t("step1D");
  document.getElementById("step1D2").innerHTML = i18next.t("step1D2");
  document.getElementById("step1D3").innerHTML = i18next.t("step1D3");
}

i18next.on("languageChanged", (lang) => {
    updateContent();
    localStorage.setItem('lang', lang);
});