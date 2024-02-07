/* eslint-disable */
import axios from "axios";
const UpdateUserInfoModule = {
  name: "UpdateUserInfoModule",
  namespaced: true,
  state: () => ({}),
  getters: {},
  mutations: {},
  actions: {
    updateUserInfo(context, frmData) {
      axios
        .post("/updateUserInfo", frmData)
        .then((res) => {
          console.log(res.status);
        })
        .catch((error) => {
          console.log(error.config);
        });
    },
  },
};
export default UpdateUserInfoModule;
