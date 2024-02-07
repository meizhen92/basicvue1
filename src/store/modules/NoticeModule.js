/* eslint-disable */
import axios from "axios";
import cookie from "vue-cookies";
const NoticeModule = {
  name: "NoticeModule",
  namespaced: true,
  state: () => ({
    allList: [],
  }),
  getters: {},
  mutations: {
    allList(state, data) {
      state.allList = data;
    },
  },
  actions: {
    // action에서 mutation보내려고 commit사용시, context.commit 관습적
    allList(context) {
      axios
        .post("/allNotice")
        .then((res) => {
          console.log(res.data);
          context.commit("allList", res.data);
        })
        .catch((error) => {
          console.log(error.config);
        });
    },
    upCnt(context, data) {
      console.log(data);
      axios
        .post("/callProcNoticeRecode", {
          userNo: data.userNo,
          noticeNo: data.noticeNo,
        })
        .then((res) => {
          console.log(res.status);
        })
        .catch((error) => {
          console.log(error.config);
        });
    },
    insertNoticeAC(context, data) {
      console.log(data);
      axios
        .post("/insertNotice", data)
        .then((res) => {
          console.log(res.data);
          if (res.data == "success") {
            document.location.href = "/notice";
          }
        })
        .catch((error) => {
          console.log(error.config);
        });
    },
  },
};
export default NoticeModule;
