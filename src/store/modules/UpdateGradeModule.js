/* eslint-disable */
import axios from "axios";
import cookie from "vue-cookies";
const UpdateGradeModule = {
  name: "UpdateGradeModule",
  namespaced: true,
  state: () => ({
    guestList: {},
  }),
  getters: {},
  mutations: {
    updateWaitList(state, data) {
      console.log(data);
      state.guestList = data;
    },
  },
  actions: {
    updateWaitList(context) {
      axios.post("/updateWaitList").then((res) => {
        if (res.data === null || res.data === "") {
          console.log("axios 실패,", res.request);
        } else {
          console.log("axios 성공,", res.data);
          context.commit("updateWaitList", res.data.guestList);
        }
      });
    },
    updateGradeU(context, val) {
      axios
        .post("/updateGradeU", { userNo: val })
        .then((res) => {
          if (res.data === null || res.data === "") {
            console.log("axios 실패,", res.request);
          } else if (res.data === "success") {
            console.log("axios 성공: return 값:", res.data);
          } else {
            console.log("return 값:", res.data);
          }
        })
        .catch((error) => {
          console.log(error.config);
        });
    },
  },
};
export default UpdateGradeModule;
