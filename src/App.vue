<script setup>
import Login from "./components/Login.vue";
import HomeView from "./views/HomeView.vue";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase.js";
import NavBar from "./components/NavBar.vue";

import { RouterLink, useRouter } from "vue-router";

const router = useRouter();

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("로그인 유지됨:", user);
    router.push("/home"); // 로그인 안 되어 있으면 이동!
  } else {
    console.log("로그아웃 상태");
    router.push("/login"); // 로그인 안 되어 있으면 이동!
  }
});
</script>

<template>
  <!-- 최상위: 전체 화면을 채우는 flex column -->
  <div
    class="flex flex-col h-dscreen w-screen max-w-screen-md items-center bg-main overflow-x-hidden"
  >
    <main class="h-full w-full p-4 overflow-y-auto">
      <router-view></router-view>
    </main>
    <NavBar></NavBar>
  </div>
</template>
