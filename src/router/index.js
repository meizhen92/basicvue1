import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/postList",
    name: "postList",
    component: () => import("../views/MovieView.vue"),
  },
  {
    path: "/notice",
    name: "notice",
    component: () => import("../views/Notice.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/movieSuda/:num",
    name: "movieSuda",
    component: () => import("../views/MovieSuda.vue"),
    props: true,
  },
  {
    path: "/myPage",
    name: "myPage",
    component: () => import("../views/MyPage.vue"),
  },
  {
    path: "/manageEmployee",
    name: "manageEmployee",
    component: () => import("../views/ManageEmployee.vue"),
  },
  {
    path: "/manageContent",
    name: "manageContent",
    component: () => import("../views/ManageContent.vue"),
  },
  {
    path: "/noticeDetail/:noticeNo",
    name: "noticeDetail",
    component: () => import("../views/NoticeDetail.vue"),
    props: true,
  },
];

// history 사용하겠다!
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
