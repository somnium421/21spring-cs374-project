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
            new: "새로운 가족 관계도 만들기",
            newD: "1세대를 중심으로 자손, 부부를 추가하여 3세대를 포함하는 우리 가족의 관계도를 작성해보세요. <br>(예시) 할아버지, 아버지, 나",
            exampleModalToggleLabel: "새로운 가족 생성",
            newD2: "지금까지 만든 가족 관계도를 저장하고 새로운 가족을 생성할까요?",
            no: "아니오",
            yes: "예",
            exampleModalToggleLabel2: "새로운 가족 생성 완료",
            save: "저장",
            code: "가족 코드 :",
            newD3: "가족 코드를 가족들과 공유하고 다 같이 서비스를 이용해보세요. <br>해당 코드는 <b>우리 가족 탭</b>에서도 확인 가능합니다.<br>",
            assign: "등록하기"
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
            new: "Create New Family Tree",
            newD: "From 1st generation, add their children and partners to make your family tree. <br> (ex) Grandfather, father, me",
            exampleModalToggleLabel: "Create new family",
            newD2: "Do you want to save the family tree created so far and create a new family?",
            no: "No",
            yes: "Yes",
            exampleModalToggleLabel2: "New family created",
            save: "Save",
            code: "Family code :",
            newD3: "Share your family code with your family and use the service together. <br>The code can also be found on the <b>My Family tab</b>.<br>",
            assign: "Assign",
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
  document.getElementById("pagetitleNew").innerHTML = i18next.t("new");
  document.getElementById("tabHome").innerHTML = i18next.t("home");
  document.getElementById("tabFamily").innerHTML = i18next.t("family");
  document.getElementById("tabMeeting").innerHTML = i18next.t("meeting");
  document.getElementById("tabLogout").innerHTML = i18next.t("logout");
  document.getElementById("close").innerHTML = i18next.t("close");
  document.getElementById("logout-button").innerHTML = i18next.t("logout");
  document.getElementById("exampleModalLabel").innerHTML = i18next.t("logoutQ");
  document.getElementById("newD").innerHTML = i18next.t("newD");
  document.getElementById("exampleModalToggleLabel").innerHTML = i18next.t("exampleModalToggleLabel");
  document.getElementById("newD2").innerHTML = i18next.t("newD2");
  document.getElementById("no").innerHTML = i18next.t("no");
  document.getElementById("yes").innerHTML = i18next.t("yes");
  document.getElementById("exampleModalToggleLabel2").innerHTML = i18next.t("exampleModalToggleLabel2");
  document.getElementById("code").innerHTML = i18next.t("code");
  document.getElementById("family-tree-submit").innerHTML = i18next.t("save");
  document.getElementById("newD3").innerHTML = i18next.t("newD3");
  document.getElementById("assign").innerHTML = i18next.t("assign");
}

i18next.on("languageChanged", () => {
    updateContent();
});