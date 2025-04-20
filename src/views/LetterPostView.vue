<template>
  <header class="p-4">
    <h1 class="text-brand text-xl font-bold select-none">팀원에게 편지 쓰기</h1>
  </header>

  <div class="px-4 pb-12">
    <p class="text-sm text-zinc-700">한 주 동안 고생한 팀원들에게 마음의 편지를 작성해보아요</p>
    <p class="text-sm text-zinc-700">한 번 작성하면, 다시 보낼 수 없으니 신중히 작성해주세요</p>

    <!-- 팀원별 편지 작성 -->
    <div class="flex flex-col mt-8">
      <div v-for="name in filteredTeamMembers" :key="name" class="mb-8">
        <label class="text-xl font-semibold mb-2 block">{{ name }}</label>
        <textarea
          v-model="messages[name]"
          class="bg-white rounded-xl p-4 border border-zinc-200 resize-none outline-blue-500 w-full"
          rows="6"
          placeholder="편지를 입력하세요"
        />
      </div>
    </div>

    <!-- 전송 버튼 -->
    <button
      @click="sendLetter"
      :disabled="Object.values(messages).every((msg) => !msg.trim())"
      class="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
    >
      보내기
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// 1. 팀원 목록
const teamMembers = ["김수민", "김태영", "박민경", "배승호", "주재완", "이다이"];
const myName = localStorage.getItem("name");
const filteredTeamMembers = teamMembers.filter((name) => name !== myName);

const messages = ref({});
filteredTeamMembers.forEach((name) => {
  messages.value[name] = "";
});

// 3. 현재 주차 정보 (ex: /letter/3 → "3")
const route = useRoute();
const router = useRouter();
const week = route.params.week;

// 4. 전송 함수
async function sendLetter() {
  const filled = Object.entries(messages.value).filter(([_, msg]) => msg.trim().length > 0);

  if (filled.length < 5) {
    alert("모두에게 편지를 써주세요!");
    return;
  }

  try {
    for (const [to, message] of filled) {
      await addDoc(collection(db, "letters"), {
        week,
        from: localStorage.getItem("name"),
        to,
        message: message.trim(),
        sentAt: serverTimestamp(),
      });
    }
    await addDoc(collection(db, "completes"), {
      week,
      user: localStorage.getItem("name"),
      sid: `week${week}letter`,
      type: "toMembers",
    });
    alert("✅ 모든 편지를 성공적으로 저장했습니다!");
    router.replace("/letter");

    // 초기화
    for (const name in messages.value) {
      messages.value[name] = "";
    }
  } catch (err) {
    console.error("❌ 편지 전송 실패:", err);
    alert("편지 전송에 실패했습니다. 다시 시도해주세요.");
  }
}
</script>
