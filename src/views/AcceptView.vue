<script setup>
import { ref, onMounted } from "vue";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase";

const teamMembers = ref([]);
const userData = ref(null);

onMounted(async () => {
  try {
    const uid = auth.currentUser?.uid || localStorage.getItem("uid");
    if (!uid) throw new Error("로그인 정보가 없습니다.");

    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error("유저 정보 없음");

    userData.value = docSnap.data();
    const myTeam = userData.value.team;

    const q = query(collection(db, "users"), where("team", "==", null), orderBy("name"));

    const snap = await getDocs(q);
    teamMembers.value = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("🔥 유저 정보 로딩 실패:", err.message);
  }
});

// 🔸 등록 버튼 클릭 시 해당 유저에게 현재 유저의 team 설정
async function assignTeam(userId) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    team: "A703",
  });

  // 등록 상태를 프론트 상태에서도 반영
  const target = teamMembers.value.find((u) => u.id === userId);
  if (target) {
    target.registered = true;
  }
}
</script>

<template>
  <div class="p-4">
    <header class="pb-4 mb-4">
      <h1 class="text-brand text-xl font-bold select-none">다다다</h1>
    </header>

    <div v-if="userData">
      <label class="text-lg font-semibold">팀 미배정 목록</label>
      <ul class="space-y-2">
        <transition-group name="fade-slide" tag="ul" class="space-y-2">
          <li
            v-for="user in teamMembers"
            :key="user.id"
            class="mt-2 px-6 gap-4 w-full flex py-4 items-center justify-between border border-zinc-200 rounded-xl bg-white"
          >
            <div class="flex gap-4 items-center">
              <!-- 왼쪽: 프로필 이미지 -->
              <img
                :src="user.profileImg || '/default-profile.png'"
                alt="profile"
                class="w-14 h-14 rounded-full object-cover bg-zinc-200"
              />

              <!-- 오른쪽: 이름 + 상태 메시지 -->
              <div class="flex flex-col overflow-hidden">
                <p class="text-lg font-semibold text-zinc-700">{{ user.name }}</p>
                <p class="text-sm text-zinc-500 truncate max-w-[200px]">
                  {{ user.statusMsg || "상태메시지가 없습니다." }}
                </p>
              </div>
            </div>

            <button
              @click="assignTeam(user.id)"
              :disabled="user.registered"
              class="py-2 px-4 rounded-xl text-sm font-semibold transition"
              :class="
                user.registered
                  ? 'bg-green-500 text-white '
                  : 'bg-blue-500 text-white hover:bg-blue-400 cursor-pointer'
              "
            >
              {{ user.registered ? "등록됨" : "등록" }}
            </button>
          </li>
        </transition-group>
      </ul>
    </div>
    <div v-else>
      <label class="text-lg font-semibold">팀원 목록</label>
      <div
        class="mt-2 py-8 px-6 w-full flex flex-col items-start justify-center border border-zinc-200 rounded-xl bg-white"
      >
        <div class="h-5 w-32 bg-zinc-200 rounded-md"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.fade-slide-move {
  transition: transform 0.4s ease;
}
</style>
