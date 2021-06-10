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
            signinD: "회원가입",
            id: "아이디",
            pw: "비밀번호",
            signin: "회원가입",
            signD: "유효한 이름이 필요합니다.",
            signD2: "비밀번호는 8-20 자 사이로 지정해주세요.",
          }
        },
        en: {
          translation: {
            signinD: "Sign in",
            id: "ID",
            pw: "Password",
            signin: "Sign in",
            signD: "Valid first name is required.",
            signD2: "Password must be 8-20 characters long.",
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
  document.getElementById("signinD").innerHTML = i18next.t("signinD");
  document.getElementById("idLable").innerHTML = i18next.t("id");
  document.getElementById("pwLable").innerHTML = i18next.t("pw");
  document.getElementById("signD").innerHTML = i18next.t("signD");
  document.getElementById("passwordHelpBlock").innerHTML = i18next.t("signD2");
  document.getElementById("sign-in").innerHTML = i18next.t("signin");
}

i18next.on("languageChanged", (lang) => {
    updateContent();
    localStorage.setItem('lang', lang);
});