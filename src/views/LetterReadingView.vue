<template>
  <header class="p-4">
    <h1 class="text-brand text-xl font-bold select-none">📨 팀원들의 편지 읽기</h1>
  </header>

  <div class="px-4 pb-12">
    <p class="text-zinc-700 mb-6">아래는 {{ week }}주차에 받은 익명의 편지입니다.</p>

    <ul class="space-y-4">
      <li
        v-for="(letter, idx) in letters"
        :key="idx"
        class="bg-white border border-zinc-200 rounded-xl p-4 leading-relaxed"
      >
        <p class="text-sm text-zinc-500 mb-2">익명 편지 #{{ idx + 1 }}</p>
        <p class="whitespace-pre-wrap text-base text-zinc-800">{{ letter.message }}</p>
      </li>
    </ul>

    <p v-if="letters.length === 0" class="text-zinc-500 mt-8 text-center">
      아직 받은 편지가 없어요 💌
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

// ✅ 로그인된 사용자 이름 (또는 uid)
const myName = localStorage.getItem("name"); // ← 실제 서비스에서는 auth.currentUser.uid 또는 nickname 사용

const route = useRoute();
const week = route.params.week;

const letters = ref([]);

onMounted(async () => {
  const q = query(collection(db, "letters"), where("week", "==", week), where("to", "==", myName));

  const snap = await getDocs(q);
  letters.value = snap.docs.map((doc) => doc.data());
});
</script>
