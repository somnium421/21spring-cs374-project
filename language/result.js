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
            delete: "삭제",
            result: "설문 결과 확인하기",
            checkresult: "설문 결과",
            place: "장소",
            activity: "활동",
            departure: "출발",
            date: "가능한 날짜",
            time: "가능한 시간대",
            comments: "댓글",
            commentsQ: "댓글을 삭제하시겠습니까?",
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
            delete: "Delete",
            result: "See organized survey results",
            checkresult: "Survey results",
            place: "Place",
            activity: "Activity",
            departure: "Departure",
            date: "Available dates",
            time: "Available time",
            comments: "Comments",
            commentsQ: "Do you want to delete your comment?",
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
  document.getElementById("pagetitleResult").innerHTML = i18next.t("result");
  document.getElementById("tabHome").innerHTML = i18next.t("home");
  document.getElementById("tabFamily").innerHTML = i18next.t("family");
  document.getElementById("tabMeeting").innerHTML = i18next.t("meeting");
  document.getElementById("tabLogout").innerHTML = i18next.t("logout");
  document.getElementById("close").innerHTML = i18next.t("close");
  document.getElementById("logout-button").innerHTML = i18next.t("logout");
  document.getElementById("exampleModalLabel1").innerHTML = i18next.t("logoutQ");
  document.getElementById("checkresult").innerHTML = i18next.t("checkresult");
  document.getElementById("place").innerHTML = i18next.t("place");
  document.getElementById("activity").innerHTML = i18next.t("activity");
  document.getElementById("departure").innerHTML = i18next.t("departure");
  document.getElementById("date").innerHTML = i18next.t("date");
  document.getElementById("time").innerHTML = i18next.t("time");
  document.getElementById("activity").innerHTML = i18next.t("activity");
  document.getElementById("exampleModalLabel").innerHTML = i18next.t("commentsQ");
  document.getElementById("closec").innerHTML = i18next.t("close");
  document.getElementById("delete-button").innerHTML = i18next.t("delete");
  document.getElementById("comments").innerHTML = i18next.t("comments");
//   document.getElementById("comments").innerHTML = i18next.t("comments");
}

i18next.on("languageChanged", () => {
    updateContent();
});