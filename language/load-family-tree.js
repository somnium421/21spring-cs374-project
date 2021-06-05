i18next.init(
    {
      lng: "ko",
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
            pagetitleLoad: "새로운 가족 관계도",
            call: "가족 관계도 불러오기",
            exampleModalLabel1: "받은 가족 코드로 인증하세요",
            code: "코드 :",
            codeD: "가족 코드란?",
            codeD2: "가족 중 최초로 서비스에 가입했던 사람이 회원가입을 마치고 가족 관계도 생성을 완료하면 받을 수 있는 코드로 알파벳과 숫자의 5자리 조합으로 이루어져 있습니다. 예: 00FF0.",
            codeD3: "코드를 받지 못했습니다. > 만들기",
            assign: "인증",
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
            pagetitleLoad: "New Family Tree",
            call: "Import family tree",
            exampleModalLabel1: "Enter your family code",
            code: "Code :",
            codeD: "What is a family code?",
            codeD2: "It is a code that can be received when the first person in the family who signed up for the service completes membership registration and completes the creation of a family relationship. It consists of a combination of five letters and numbers. Example: 00FF0.",
            codeD3: "I did not receive the code. > Create",
            assign: "assign",
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
  document.getElementById("pagetitleLoad").innerHTML = i18next.t("meeting");
  document.getElementById("tabHome").innerHTML = i18next.t("home");
  document.getElementById("tabFamily").innerHTML = i18next.t("family");
  document.getElementById("tabMeeting").innerHTML = i18next.t("meeting");
  document.getElementById("tabLogout").innerHTML = i18next.t("logout");
  document.getElementById("close").innerHTML = i18next.t("close");
  document.getElementById("logout-button").innerHTML = i18next.t("logout");
  document.getElementById("exampleModalLabel").innerHTML = i18next.t("logoutQ");
  document.getElementById("call").innerHTML = i18next.t("call");
  document.getElementById("exampleModalLabel1").innerHTML = i18next.t("exampleModalLabel1");
  document.getElementById("code").innerHTML = i18next.t("code");
  document.getElementById("codeD").innerHTML = i18next.t("codeD");
  document.getElementById("codeD2").innerHTML = i18next.t("codeD2");
  document.getElementById("codeD3").innerHTML = i18next.t("codeD3");
  document.getElementById("close2").innerHTML = i18next.t("close");
  document.getElementById("submit-family-code").innerHTML = i18next.t("assign");
}

i18next.on("languageChanged", () => {
    updateContent();
});