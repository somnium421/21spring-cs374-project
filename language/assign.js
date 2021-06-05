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
            title: "등록하기",
            ass1: "아래 가족 관계도에서 나의 위치를 찾아 선택하세요!",
            here: "여기에 등록할까요?",
            no: "아니오",
            yes: "예",
            fail: "등록 실패",
            ass2: "이미 등록된 사람입니다. 다른 구성원을 선택해주세요.",
            profile: "프로필 설정",
            ass3: "프로필 사진을 업로드 하세요. 가족들이 당신을 더 잘 알아볼 수 있습니다:)",
            later: "나중에 하기",
            upload: "업로드 중...",
            save: "저장",
            complete: "등록 완료",
            ass4: "해당 위치에 등록 완료하였습니다.",
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
            title: "Register",
            ass1: "Find and select your position in the family-tree diagram below!",
            here: "Would you like to register here?",
            no: "No",
            yes: "Yes",
            fail: "Assign failed",
            ass2: "This member is already registered. Please select another member.",
            profile: "Set profile image",
            ass3: "Uplaod your profile image. Your family can reconize you more easily :)",
            later: "Later",
            upload: "Uploading...",
            save: "Save",
            complete: "Register completed",
            ass4: "You have registered at the location.",
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
  document.getElementById("pagetitleAssign").innerHTML = i18next.t("title");
  document.getElementById("tabHome").innerHTML = i18next.t("home");
  document.getElementById("tabFamily").innerHTML = i18next.t("family");
  document.getElementById("tabMeeting").innerHTML = i18next.t("meeting");
  document.getElementById("tabLogout").innerHTML = i18next.t("logout");
  document.getElementById("close").innerHTML = i18next.t("close");
  document.getElementById("logout-button").innerHTML = i18next.t("logout");
  document.getElementById("exampleModalLabel").innerHTML = i18next.t("logoutQ");
  document.getElementById("ass1").innerHTML = i18next.t("ass1");
  document.getElementById("exampleModalToggleLabel").innerHTML = i18next.t("title");
  document.getElementById("here").innerHTML = i18next.t("here");
  document.getElementById("no").innerHTML = i18next.t("no");
  document.getElementById("assign-me").innerHTML = i18next.t("yes");
  document.getElementById("exampleModalToggleLabel_3").innerHTML = i18next.t("fail");
  document.getElementById("ass2").innerHTML = i18next.t("ass2");
  document.getElementById("exampleModalToggleLabel_1").innerHTML = i18next.t("profile");
  document.getElementById("ass3").innerHTML = i18next.t("ass3");
  document.getElementById("later").innerHTML = i18next.t("later");
  document.getElementById("upload").innerHTML = i18next.t("upload");
  document.getElementById("assign-submit").innerHTML = i18next.t("save");
  document.getElementById("exampleModalToggleLabel_2").innerHTML = i18next.t("complete");
  document.getElementById("ass4").innerHTML = i18next.t("ass4");
  document.getElementById("here").innerHTML = i18next.t("here");
  document.getElementById("here").innerHTML = i18next.t("here");
  document.getElementById("here").innerHTML = i18next.t("here");
  document.getElementById("here").innerHTML = i18next.t("here");
}

i18next.on("languageChanged", () => {
    updateContent();
});