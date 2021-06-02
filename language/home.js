i18next.init(
    {
      lng: "en",
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
            participateAsOther: "다른 사람으로 참가하기",
            goBacktoAccount:"원래 계정으로 돌아가기",
            whoQ: "어떤 사람으로 참가하시겠습니까?",
            cancel: "취소",
            done: "완료",
            noFamilyD: "아직 가족 관계도가 없습니다.",
            make: "생성하기",
            loginD: "로그인 해주세요"
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
            participateAsOther: "Participate as another member",
            goBacktoAccount:"Return to original account",
            whoQ: "Who would you like to participate as?",
            cancel: "Cancel",
            done: "Done",
            noFamilyD: "No family tree yet.",
            make: "Make",
            loginD: "Please log in"
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
  document.getElementById("pagetitleHome").innerHTML = i18next.t("home");
  document.getElementById("tabHome").innerHTML = i18next.t("home");
  document.getElementById("tabFamily").innerHTML = i18next.t("family");
  document.getElementById("tabMeeting").innerHTML = i18next.t("meeting");
  document.getElementById("titleFamily").innerHTML = i18next.t("family");
  document.getElementById("titleMeeting").innerHTML = i18next.t("meeting");
  document.getElementById("tabLogout").innerHTML = i18next.t("logout");
  document.getElementById("participateAsOther").innerHTML = i18next.t("participateAsOther");
  document.getElementById("goBacktoAccount").innerHTML = i18next.t("goBacktoAccount");
  document.getElementById("close").innerHTML = i18next.t("close");
  document.getElementById("logout-button").innerHTML = i18next.t("logout");
  document.getElementById("exampleModalLabel").innerHTML = i18next.t("logoutQ");
  document.getElementById("exampleModalLabel2").innerHTML = i18next.t("whoQ");
  document.getElementById("cancel-button").innerHTML = i18next.t("cancel");
  document.getElementById("select-account-button").innerHTML = i18next.t("done");
  //document.getElementById("noFamilyD").innerHTML = i18next.t("noFamilyD");
  //document.getElementById("makeOne").innerHTML = i18next.t("make");
}

i18next.on("languageChanged", () => {
    updateContent();
});