<template>
  <div class="flex flex-col justify-center items-center px-4">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">구글 로그인</h1>
    <button
      @click="loginWithGoogle"
      class="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-200"
    >
      구글로 로그인
    </button>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
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
