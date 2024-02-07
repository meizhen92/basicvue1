/* eslint-disable */
import axios from "axios";

const RegisterModule = {
  name: "RegisterModule",
  namespaced: true,
  state: () => ({
    mailNumCheck: "",
    reCaptchaRes: "false",
  }),
  getters: {},
  mutations: {
    reCaptchaResMU(state, data) {
      state.reCaptchaRes = data;
    },
  },
  actions: {
    registerUserAC(context, frm) {
      axios
        .post("/registerUser", frm, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.status);
          if (res.data === null || res.data === "") {
            console.log("axios 실패", res.request);
          } else {
            console.log("axios 성공", res.data);
            // 비동기라서 setTimeout
            setTimeout(() => {
              if (res.data > 0) {
                alert("회원가입성공");
                document.location.href = "/postList";
              } else {
                alert("회원가입실패, 죄송합니다 다시 시도해주세요!");
              }
            }, 1000);
          }
        })
        .catch((error) => {
          console.log(error.config);
        });
    },
    idCheckAC(context, inputId) {
      axios
        .post("/idCheck", { userId: inputId })
        .then((res) => {
          if (res.status !== 200) {
            console.log("axios 실패", res.request);
          } else {
            console.log("axios 성공", res.data);
            // 비동기라서 setTimeout
            setTimeout(() => {
              if (res.data === false) {
                alert("아이디 사용이 가능합니다");
              } else {
                alert(
                  "사용중인 아이디입니다. 다른 아이디로 중복검사를 진행해주세요!"
                );
              }
            }, 1000);
          }
        })
        .catch((error) => {
          console.log(error.config);
        });
    },
    mailCheckAC(context, inputEmail) {
      axios
        .post("/mailCheck", { userMail: inputEmail })
        .then((res) => {
          if (res.status !== 200) {
            console.log("axios 실패", res.request);
          } else {
            console.log("axios 성공", res.data);
            // 비동기라서 setTimeout
            setTimeout(() => {
              // context.commit("",res.data);
            }, 1000);
          }
        })
        .catch((error) => {
          console.log(error.config);
        });
    },
    mailNumCheckAC(context, num) {},
    reCaptchaResAC(context, reRes) {
      axios
        .post("/recaptcha", { reCaptRes: reRes })
        .then((res) => {
          console.log("res---->", res.data);
          context.commit("reCaptchaResMU", res.data);
        })
        .catch((error) => {
          console.log(error.toJSON());
        });
    },
  },
};
export default RegisterModule;
