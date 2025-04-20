<!-- RegisterInline.vue -->
<template>
  <!-- 인트로와 동일: min‑h‑dvh + flex‑col + 좌우 24px 여백 -->
  <div class="min-h-dvh flex flex-col px-6 py-16 select-none justify-between">
    <!-- 상단 타이틀 -->
    <div>
      <h1 class="text-2xl font-bold leading-[1.3]">
        간단 정보 입력하고<br />
        <span class="text-blue-600">다다다</span> 시작하기
      </h1>

      <!-- 입력 영역 -->
      <div class="flex flex-col gap-8 mt-8">
        <!-- 이름 -->
        <transition name="fade" appear>
          <div v-if="step >= 0">
            <label class="text-sm font-medium text-zinc-700">이름</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="이름을 입력해주세요"
              class="mt-2 bg-white w-full border border-gray-100 rounded-xl px-4 py-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              @keyup.enter="handleNext"
              @blur="handleNext"
            />
          </div>
        </transition>
      </div>
    </div>

    <!-- 완료 버튼 -->
    <transition name="slide-up">
      <button
        v-if="step >= 1"
        class="mt-16 w-full py-3 text-white bg-blue-500 rounded-xl text-lg font-semibold transition cursor-pointer"
        @click="submit"
      >
        가입하기
      </button>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { db } from "../firebase.js";
import { doc, setDoc } from "firebase/firestore";

const router = useRouter();
const step = ref(0);
const form = ref({ name: "" });

function handleNext() {
  if (step.value === 0 && form.value.name.trim()) step.value++;
}

async function submit() {
  try {
    await setDoc(doc(db, "users", localStorage.getItem("uid")), {
      name: form.value.name,
      role: "member",
      team: null,
      profileImg:
        "https://programmers.co.kr/assets/profiles/img-profile-default-4-ffcafb1008013a6bc4184d726ee887e263dbae95ee3bab4c5639f1dcc5e8ec43.png",
      createdAt: new Date(),
    });

    console.log("✅ 회원 정보 저장 완료");
    router.push("/home");
  } catch (error) {
    console.error("❌ Firestore 저장 오류:", error);
    alert("회원가입에 실패했어요. 다시 시도해주세요!");
  }
}
</script>

<style scoped>
/* 인트로와 동일한 애니메이션 유지 */
.fade-enter-active {
  transition: opacity 0.6s ease;
}
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}

.slide-up-enter-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
