/* eslint-disable import/no-extraneous-dependencies */

import { createApp } from "vue";
import axios from "axios";
import cookie from "vue-cookies";
import { quillEditor } from "vue3-quill";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// axios defaults type 선택
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
// base url 설정
// axios.defaults.baseURL = "http://localhost:8080";

// cookie 만료일 전역 선언
cookie.config("7d");

const app = createApp(App);
// axios 전역 설정
app.config.globalProperties.axios = axios;
// app에서 사용할 경로 설정
app.use(store).use(router).use(cookie).use(quillEditor).mount("#app");
