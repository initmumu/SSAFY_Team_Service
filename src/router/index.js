import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../components/Login.vue";
import LetterView from "../views/LetterView.vue";
import TeamView from "../views/TeamView.vue";
import MyPageView from "../views/MyPageView.vue";
import RegisterView from "../views/RegisterView.vue";
import OnBoadingView from "../views/OnBoadingView.vue";
import AcceptView from "../views/AcceptView.vue";

const routes = [
  { path: "/home", component: HomeView },
  { path: "/login", component: Login, meta: { hideFooter: true } },
  { path: "/letter", component: LetterView },
  { path: "/team", component: TeamView },
  { path: "/mypage", component: MyPageView },
  { path: "/onboading", component: OnBoadingView, meta: { hideFooter: true } },
  { path: "/register", component: RegisterView, meta: { hideFooter: true } },
  { path: "/team/accept", component: AcceptView },
  {
    path: "/letter/post/:week",
    name: "LetterWriter",
    component: () => import("../views/LetterPostView.vue"),
  },
  {
    path: "/letter/team/:week",
    name: "LetterTeamWriter",
    component: () => import("../views/LetterTeamPostView.vue"),
  },
  {
    path: "/letter/read/:week",
    name: "LetterRead",
    component: () => import("../views/LetterReadingView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 항상 맨 위로
    return { top: 0 };
  },
});

export default router;
