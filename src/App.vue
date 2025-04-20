<script setup>
import Login from "./components/Login.vue";
import HomeView from "./views/HomeView.vue";
import { ref, onMounted, watch } from "vue";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth } from "./firebase.js";
import { db } from "./firebase.js";
import NavBar from "./components/NavBar.vue";

import { RouterLink, useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const navBarRef = ref(null);
const mainPadding = ref("0px");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("로그인된 사용자:", user.uid);
    localStorage.setItem("uid", user.uid);

    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      localStorage.setItem("name", userDocSnap.data().name);
      if (route.path === "/" || route.path === "/login") {
        router.replace("/home");
      }
    } else {
      router.replace("/onboading");
    }
  } else {
    router.replace("/login");
  }
});

const hiddenFooterRoutes = ["/login", "/register", "/onboading"];

// padding 계산 로직
const updatePadding = () => {
  if (!hiddenFooterRoutes.includes(route.path) && navBarRef.value?.el) {
    mainPadding.value = `${navBarRef.value.el.offsetHeight}px`;
  } else {
    mainPadding.value = "0px";
  }
};

onMounted(() => {
  updatePadding();
});

watch(
  () => route.path,
  () => {
    updatePadding();
  }
);
</script>

<template>
  <div
    class="flex flex-col min-h-dvh w-screen max-w-screen-md items-center bg-main overflow-x-hidden"
  >
    <main class="h-full w-full overflow-y-auto" :style="{ paddingBottom: mainPadding }">
      <router-view />
    </main>
    <NavBar v-if="!route.meta.hideFooter" ref="navBarRef" class="max-w-screen-md"></NavBar>
  </div>
</template>

<style scoped>
.fade-page-enter-active,
.fade-page-leave-active {
  transition: opacity 0.4s ease;
}

.fade-page-enter-from,
.fade-page-leave-to {
  opacity: 0;
}

.fade-page-enter-to,
.fade-page-leave-from {
  opacity: 1;
}
</style>
