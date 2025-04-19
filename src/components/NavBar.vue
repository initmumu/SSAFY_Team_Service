<template>
  <footer
    class="bottom-0 sticky bg-white border-t border-t-gray-100 border-r border-r-gray-100 border-l border-l-gray-100 w-full text-gray-600 rounded-t-4xl h-17 text-sm pt-3 pb-0 px-12 text-center flex justify-between"
  >
    <RouterLink to="/home"><HomeIcon color="#323232" size="20">홈</HomeIcon></RouterLink>
    <RouterLink to="/letter"><LetterIcon color="#969696" size="20">편지</LetterIcon></RouterLink>
    <RouterLink to="/team"><PeopleIcon color="#969696" size="20">팀</PeopleIcon></RouterLink>
    <RouterLink to="/mypage"><PersonIcon color="#969696" size="20">마이</PersonIcon></RouterLink>
    <PersonIcon color="#969696" size="20" @click="signOut(auth)">로그아웃</PersonIcon>
  </footer>
</template>
<script setup>
import HomeIcon from "../icons/HomeIcon.vue";
import PersonIcon from "../icons/PersonIcon.vue";
import LetterIcon from "../icons/LetterIcon.vue";
import PeopleIcon from "../icons/PeopleIcon.vue";
</script>
