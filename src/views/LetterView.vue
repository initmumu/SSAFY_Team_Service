<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { db, auth } from "../firebase";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";

const ongoingSurveys = ref([]);
const endedSurveys = ref([]);
const isLoading = ref(true);
const isUserLoading = ref(true);
const isTeamed = ref(false);

const router = useRouter();

onMounted(async () => {
  const uid = auth.currentUser?.uid || localStorage.getItem("uid");
  if (!uid) return;

  // 🔹 유저 정보 조회
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      if (userData.team) {
        isTeamed.value = true;
      }
    }
  } catch (e) {
    console.error("유저 정보 로딩 실패", e);
  } finally {
    isUserLoading.value = false;
  }

  if (!isTeamed.value) return;

  const now = new Date();

  // 🔹 진행 중 설문 가져오기
  const q = query(
    collection(db, "surveys"),
    where("startAt", "<=", now),
    where("endAt", ">=", now)
  );
  const snap = await getDocs(q);
  const surveys = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  // 🔹 완료된 설문
  const completedQ = query(
    collection(db, "completes"),
    where("user", "==", localStorage.getItem("name"))
  );
  const completedSnap = await getDocs(completedQ);
  const completedSids = new Set(completedSnap.docs.map((doc) => doc.data().sid));

  ongoingSurveys.value = surveys.map((s) => ({
    ...s,
    complete: completedSids.has(s.id),
  }));

  // 🔹 종료된 설문
  const endedQ = query(collection(db, "surveys"), where("endAt", "<=", now));
  const endedSnap = await getDocs(endedQ);
  endedSurveys.value = endedSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  isLoading.value = false;
});

function goToSurvey(path) {
  router.push(path);
}
</script>

<template>
  <header class="p-4">
    <h1 class="text-brand text-xl font-bold select-none">편지가 왔어요</h1>
  </header>

  <div class="p-4">
    <!-- 🔄 유저 정보 판단 중 -->
    <div v-if="isUserLoading" class="space-y-2">
      <div class="h-16 w-full bg-zinc-100 rounded-xl animate-pulse" />
    </div>

    <!-- ❌ 팀 미가입 -->
    <div v-else-if="!isTeamed">
      <p class="text-zinc-500">아직 팀에 가입되지 않았어요...</p>
    </div>

    <!-- ✅ 팀 가입 완료 -->
    <div v-else>
      <!-- 진행 중인 설문 -->
      <h2 class="text-lg font-semibold mb-2">진행 중인 편지</h2>

      <div v-if="isLoading" class="space-y-3 mb-6">
        <div
          v-for="i in 1"
          :key="'ongoing-skeleton-' + i"
          class="h-16 w-full bg-zinc-100 rounded-xl animate-pulse"
        />
      </div>

      <ul v-else-if="ongoingSurveys.length" class="space-y-3">
        <li
          v-for="survey in ongoingSurveys"
          :key="survey.id"
          @click="!survey.complete && goToSurvey(survey.link || `/survey/${survey.id}`)"
          class="flex justify-between items-center font-semibold px-6 py-6 border border-zinc-200 rounded-xl select-none"
          :class="
            survey.complete
              ? 'bg-gray-100 cursor-default text-gray-400'
              : 'bg-white cursor-pointer text-zinc-700'
          "
        >
          <div>{{ survey.title }}</div>
          <div
            :class="survey.complete ? 'bg-blue-400' : 'bg-green-400'"
            class="px-3 py-1 text-white rounded-xl text-sm"
          >
            {{ survey.complete ? "작성 완료" : "작성 전" }}
          </div>
        </li>
      </ul>

      <div v-else>
        <p class="text-zinc-500">현재 진행 중인 편지가 없습니다</p>
      </div>

      <!-- 종료된 설문 -->
      <h2 class="text-lg font-semibold mb-2 mt-10">팀원들에게 받은 편지</h2>

      <div v-if="isLoading" class="space-y-3">
        <div
          v-for="i in 1"
          :key="'ended-skeleton-' + i"
          class="h-16 w-full bg-zinc-100 rounded-xl animate-pulse"
        />
      </div>

      <ul v-else-if="endedSurveys.length" class="space-y-3">
        <li
          v-for="survey in endedSurveys"
          :key="survey.id"
          @click="goToSurvey(`/letter/read/${survey.week}`)"
          class="cursor-pointer font-semibold text-zinc-700 px-6 py-6 bg-white border border-zinc-200 rounded-xl"
        >
          <div>{{ survey.title }}</div>
        </li>
      </ul>

      <div v-else>
        <p class="text-zinc-500">현재 종료된 편지 주차가 없습니다</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}
</style>
