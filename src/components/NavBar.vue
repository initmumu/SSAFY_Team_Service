<template>
  <footer
    ref="footerRef"
    class="bottom-0 fixed bg-white border-t border-t-gray-100 border-r border-r-gray-100 border-l border-l-gray-100 w-full text-gray-600 rounded-t-4xl h-17 text-sm pt-0 pb-0 px-12 text-center flex justify-between"
  >
    <button @click="goTo('/home')">
      <HomeIcon :color="isActive('/home') ? '#323232' : '#969696'" size="20">홈</HomeIcon>
    </button>
    <button @click="goTo('/letter')">
      <LetterIcon :color="isActive('/letter') ? '#323232' : '#969696'" size="20">편지</LetterIcon>
    </button>
    <button @click="goTo('/team')">
      <PeopleIcon :color="isActive('/team') ? '#323232' : '#969696'" size="20">팀</PeopleIcon>
    </button>
    <button @click="goTo('/mypage')">
      <PersonIcon :color="isActive('/mypage') ? '#323232' : '#969696'" size="20">마이</PersonIcon>
    </button>
  </footer>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import HomeIcon from "../icons/HomeIcon.vue";
import PersonIcon from "../icons/PersonIcon.vue";
import LetterIcon from "../icons/LetterIcon.vue";
import PeopleIcon from "../icons/PeopleIcon.vue";

const router = useRouter();
const route = useRoute();

const isActive = (path) => route.path.startsWith(path);

// replace로 이동
function goTo(path) {
  if (route.path !== path) {
    router.replace(path); // 🔁 히스토리에 push 안 됨
  }
}

const footerRef = ref(null);
defineExpose({ el: footerRef });
</script>
