<template>
  <div class="p-4">
    <header class="pb-4 mb-4">
      <h1 class="text-brand text-xl font-bold select-none">마이페이지</h1>
    </header>
    <div v-if="userData">
      <label class="text-lg font-semibold">기본 정보</label>
      <div
        class="mt-2 mb-12 py-12 w-full flex flex-col items-center justify-center border border-zinc-200 rounded-xl bg-white"
      >
        <img :src="userData.profileImg" class="rounded-full h-32" />
        <h1 class="text-xl font-semibold mt-6">
          <span class="text-blue-600">{{ userData.name }}</span
          >님 안녕하세요
        </h1>
        <p class="mt-2">{{ userData.statusMsg }}</p>
      </div>

      <label class="text-lg font-semibold">팀 정보</label>
      <div
        class="mt-2 mb-12 py-6 px-6 w-full flex flex-col items-start justify-center border border-zinc-200 rounded-xl bg-white"
      >
        <h1 class="text-zinc-700 font-semibold">
          자율 프로젝트 <span class="text-blue-600">{{ userData.team }}</span>
        </h1>
      </div>

      <label class="text-lg font-semibold">계정 관리</label>
      <button
        @click="logout"
        class="text-red-500 cursor-pointer mt-2 py-6 px-6 w-full flex flex-col items-start justify-center border border-zinc-200 rounded-xl bg-white"
      >
        <h1 class="font-semibold">로그아웃</h1>
      </button>
    </div>

    <div v-else>
      <div class="animate-pulse">
        <!-- 기본 정보 스켈레톤 -->
        <label class="text-lg font-semibold">기본 정보</label>
        <div
          class="mt-2 mb-12 py-12 w-full flex flex-col items-center justify-center border border-zinc-200 rounded-xl bg-white"
        >
          <div class="rounded-full h-32 w-32 bg-zinc-200"></div>
          <div class="mt-6 h-6 w-48 bg-zinc-200 rounded-md"></div>
          <div class="mt-2 h-4 w-40 bg-zinc-200 rounded-md"></div>
        </div>

        <!-- 팀 정보 스켈레톤 -->
        <label class="text-lg font-semibold">팀 정보</label>
        <div
          class="mt-2 mb-12 py-8 px-6 w-full flex flex-col items-start justify-center border border-zinc-200 rounded-xl bg-white"
        >
          <div class="h-5 w-64 bg-zinc-200 rounded-md"></div>
        </div>

        <!-- 계정 관리 스켈레톤 -->
        <label class="text-lg font-semibold">계정 관리</label>
        <div
          class="mt-2 py-8 px-6 w-full flex flex-col items-start justify-center border border-zinc-200 rounded-xl bg-white"
        >
          <div class="h-5 w-32 bg-zinc-200 rounded-md"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getDoc, doc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db } from "../firebase";
import { auth } from "../firebase";

const userData = ref(null);

onMounted(async () => {
  try {
    const uid = auth.currentUser?.uid || localStorage.getItem("uid");
    if (!uid) throw new Error("로그인 정보가 없습니다.");

    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      userData.value = docSnap.data();
    } else {
      console.warn("유저 정보가 존재하지 않습니다.");
    }
  } catch (err) {
    console.error("🔥 유저 정보 로딩 실패:", err.message);
  }
});

async function logout() {
  await signOut(auth);
  localStorage.removeItem("uid");
  localStorage.removeItem("name");
  router.replace("/login");
}
</script>
