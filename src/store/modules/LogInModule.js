/* eslint-disable */
import axios from "axios";
import cookie from "vue-cookies";

const LogInModule = {
  name: "LogInModule",
  namespaced: true,
  state: () => ({
    userInfo: {},
    fileInfo: {},
    file_img_rel_Nm: "",
    userNm: "",
    userNo: 0,
    userGrade: "",
  }),
  getters: {},
  mutations: {
    login(state, data) {
      state.userInfo = data.selUser;
      state.fileInfo = data.selFile;
      state.file_img_rel_Nm = data.selFile.file_route_rel.split("\\")[9];
      state.userNm = data.selUser.user_name;
      state.userNo = data.selUser.user_no;
      state.userGrade = data.selUser.user_grade;
      cookie.set("userNo", state.userInfo.user_no);
      cookie.set("userId", state.userInfo.user_id);
      cookie.set("userName", state.userInfo.user_name);
      cookie.set("userGrade", state.userInfo.user_grade);
      cookie.set("userProfile", state.file_img_rel_Nm);
    },
    logout(state) {
      state.userInfo = "";
      state.fileInfo = "";
      state.file_img_rel_Nm = "";
      state.userNm = "";
      state.userNo = 0;
      state.userGrade = "";
      cookie.remove("userNo");
      cookie.remove("userId");
      cookie.remove("userName");
      cookie.remove("userGrade");
      cookie.remove("userProfile");
    },
  },
  actions: {
    logInValid(context, inputData) {
      axios
        .post("/logInValid", inputData)
        .then((res) => {
          if (res.data.selUser === null || res.data === "") {
            console.log("axios 실패 - 아디or비번틀림", res.request);
            alert("로그인 정보가 일치하지 않습니다");
          } else {
            console.log("axios 성공", res.data);
            // 비동기라서 setTimeout
            setTimeout(() => {
              context.commit("login", res.data);
            }, 300);
          }
        })
        .catch((error) => {
          console.log(error.config);
        });
    },
  },
};

export default LogInModule;
