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
            pagetitleNewMeeting: "새 모임 만들기",
            step1Title: "계획하시는 모임을 설명해주세요.",
            step1meetingname: "모임명",
            step1meetingD: "모임 설명",
            next: "다음",
            step2Title: "모임에 초대하고 싶은 사람을 골라주세요.",
            step2participant: "참가자 선택",
            step3Title: "어떤 모임을 하고 싶은가요?",
            step3place: "장소 추천하기",
            add: "추가",
            step3place2: "참여자들에게 장소를",
            step3place3: "추천 받지 않음",
            step3activity: "할 일 추천하기",
            step3act2: "참여자들에게 할 일을",
            step4Title: "모임 스케줄을 구체화해보세요.",
            step4period: "모임기간",
            day: "일",
            hour: "시간",
            step4dates: "가능한 날짜",
            availabletime: "가능한 시간대",
            step5Title: "설문 기간과 공개 범위를 설정하세요.",
            step5period: "참가 설문 기간",
            step5privacy: "모임 공개 범위",
            step5public: "공개",
            step5private: "비공개",
            final: "만들기",
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
            pagetitleNewMeeting: "Create New Meeting",
            step1Title: "Explain your meeting plan.",
            step1meetingname: "Meeting title",
            step1meetingD: "Meeting description",
            next: "Next",
            step2Title: "Choose the participants in the meeting",
            step2participant: "Participants selection",
            step3Title: "What meeting do you want to do?",
            step3place: "Suggest the meeting places",
            add: "Add",
            step3place2: "No place candidates were",
            step3place3: "recommended by participants",
            step3activity: "Suggest the activities",
            step3act2: "No activity candidates were",
            step4Title: "Schedule your meeting.",
            step4period: "Meeting period",
            day: "day",
            hour: "hour",
            step4dates: "Available dates",
            availabletime: "Available time",
            step5Title: "Set survey period and privacy.",
            step5period: "Survey deadline duration",
            step5privacy: "Meeting privacy",
            step5public: "Public",
            step5private: "Private",
            final: "Submit",
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
  document.getElementById("pagetitleNewMeeting").innerHTML = i18next.t("pagetitleNewMeeting");
  document.getElementById("tabHome").innerHTML = i18next.t("home");
  document.getElementById("tabFamily").innerHTML = i18next.t("family");
  document.getElementById("tabMeeting").innerHTML = i18next.t("meeting");
  document.getElementById("tabLogout").innerHTML = i18next.t("logout");
  document.getElementById("step1Title").innerHTML = i18next.t("step1Title");
  document.getElementById("step1meetingname").innerHTML = i18next.t("step1meetingname");
  document.getElementById("step1meetingD").innerHTML = i18next.t("step1meetingD");
  document.getElementById("step1-submit").innerHTML = i18next.t("next");
  document.getElementById("step2Title").innerHTML = i18next.t("step2Title");
  document.getElementById("step2participant").innerHTML = i18next.t("step2participant");
  document.getElementById("step2-submit").innerHTML = i18next.t("next");
  document.getElementById("step3Title").innerHTML = i18next.t("step3Title");
  document.getElementById("step3place").innerHTML = i18next.t("step3place");
  document.getElementById("add-place").innerHTML = i18next.t("add");
  document.getElementById("step3place2").innerHTML = i18next.t("step3place2");
  document.getElementById("step3place3").innerHTML = i18next.t("step3place3");
  document.getElementById("step3activity").innerHTML = i18next.t("step3activity");
  document.getElementById("add-activity").innerHTML = i18next.t("add");
  document.getElementById("step3act2").innerHTML = i18next.t("step3act2");
  document.getElementById("step3act3").innerHTML = i18next.t("step3place3");
  document.getElementById("step3-submit").innerHTML = i18next.t("next");
  document.getElementById("step4Title").innerHTML = i18next.t("step4Title");
  document.getElementById("step4period").innerHTML = i18next.t("step4period");
  document.getElementById("step4day").innerHTML = i18next.t("day");
  document.getElementById("step4hour").innerHTML = i18next.t("hour");
  document.getElementById("step4dates").innerHTML = i18next.t("step4dates");
  document.getElementById("availabletime").innerHTML = i18next.t("availabletime");
  document.getElementById("step4-submit").innerHTML = i18next.t("next");
  document.getElementById("step5Title").innerHTML = i18next.t("step5Title");
  document.getElementById("step5period").innerHTML = i18next.t("step5period");
  document.getElementById("step5day").innerHTML = i18next.t("day");
  document.getElementById("step5privacy").innerHTML = i18next.t("step5privacy");
  document.getElementById("step5public").innerHTML = i18next.t("step5public");
  document.getElementById("step5private").innerHTML = i18next.t("step5private");
  document.getElementById("final-submit").innerHTML = i18next.t("final");
  document.getElementById("logout-button").innerHTML = i18next.t("logout");
  document.getElementById("exampleModalLabel").innerHTML = i18next.t("logoutQ");
  document.getElementById("close").innerHTML = i18next.t("close");
}

i18next.on("languageChanged", () => {
    updateContent();
});