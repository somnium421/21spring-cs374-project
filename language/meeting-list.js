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
            participate: "참가함",
            notParticipate: "아직 참가하지 않음",
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
            participate: "Participate in",
            notParticipate: "Not participate yet",
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
  document.getElementById("pagetitleMeeting").innerHTML = i18next.t("meeting");
  document.getElementById("tabHome").innerHTML = i18next.t("home");
  document.getElementById("tabFamily").innerHTML = i18next.t("family");
  document.getElementById("tabMeeting").innerHTML = i18next.t("meeting");
  document.getElementById("tabLogout").innerHTML = i18next.t("logout");
  document.getElementById("close").innerHTML = i18next.t("close");
  document.getElementById("logout-button").innerHTML = i18next.t("logout");
  document.getElementById("exampleModalLabel").innerHTML = i18next.t("logoutQ");
  document.getElementById("participateM").innerHTML = i18next.t("participate");
  document.getElementById("notParticipateM").innerHTML = i18next.t("notParticipate");
  document.getElementById("participateM").innerHTML = i18next.t("participate");
}

i18next.on("languageChanged", (lang) => {
    updateContent();
    localStorage.setItem('lang', lang);
});