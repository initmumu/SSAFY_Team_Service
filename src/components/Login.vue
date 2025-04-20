<template>
  <div class="flex flex-col min-h-dvh p-4">
    <h1 class="text-xl text-blue-600 font-bold mb-16">다이다이 다슥아</h1>
    <div class="flex flex-1 flex-col items-center p-4 px-4 justify-between">
      <h1 class="text-2xl font-semibold mb-6">회원 로그인</h1>
      <button
        @click="loginWithGoogle"
        class="flex items-center justify-center w-full bg-white border border-zinc-200 text-zinc-700 px-6 py-4 my-12 rounded-xl"
      >
        <img src="https://img.icons8.com/?size=512&id=17949&format=png" class="w-8 mr-4" />
        Google 계정으로 시작하기
      </button>
    </div>
  </div>
</template>

<script setup>
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase.js";
import { useRouter } from "vue-router";

const router = useRouter();

const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log("구글 로그인 성공:", user.email);
    router.push("/home");
  } catch (error) {
    console.error("구글 로그인 실패:", error.message);
  }
};
</script>
