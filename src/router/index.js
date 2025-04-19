import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../components/Login.vue";
import LetterView from "../views/LetterView.vue";
import TeamView from "../views/TeamView.vue";
import MyPageView from "../views/MyPageView.vue";

const routes = [
  { path: "/home", component: HomeView },
  { path: "/login", component: Login },
  { path: "/letter", component: LetterView },
  { path: "/team", component: TeamView },
  { path: "/mypage", component: MyPageView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
