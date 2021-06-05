i18next.init(
    {
      lng: "ko",
      debug: true,
      resources: {
        ko: {
          translation: {
            loginD: "로그인 해주세요",
            id: "아이디",
            pw: "비밀번호",
            loginQ: "아직 회원이 아니신가요?",
            signin: "회원가입",
            login: "로그인",
          }
        },
        en: {
          translation: {
            loginD: "Please log in",
            id: "ID",
            pw: "Password",
            loginQ: "No account yet?",
            signin: "Sign in",
            login: "Log in"
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
  document.getElementById("loginD").innerHTML = i18next.t("loginD");
  document.getElementById("idLable").innerHTML = i18next.t("id");
  document.getElementById("pwLable").innerHTML = i18next.t("pw");
  document.getElementById("loginQ").innerHTML = i18next.t("loginQ");
  document.getElementById("signinLink").innerHTML = i18next.t("signin");
  document.getElementById("login").innerHTML = i18next.t("login");
}

i18next.on("languageChanged", () => {
    updateContent();
});