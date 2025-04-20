<script setup>
import { ref, onMounted } from "vue";
import { collection, query, where, orderBy, getDocs, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useRouter } from "vue-router";

const teamMembers = ref([]);
const isLoadingMembers = ref(true);
const isUserLoading = ref(true);
const teamName = "A703"; // 예시로 정적 설정

const router = useRouter();
const userData = ref(null);
const notTeamed = ref(true);

onMounted(async () => {
  try {
    const uid = auth.currentUser?.uid || localStorage.getItem("uid");
    if (!uid) throw new Error("로그인 정보가 없습니다.");

    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      userData.value = docSnap.data();
      if (userData.value.team) {
        notTeamed.value = false;
      }
    } else {
      console.warn("유저 정보가 존재하지 않습니다.");
    }
  } catch (err) {
    console.error("🔥 유저 정보 로딩 실패:", err.message);
  } finally {
    isUserLoading.value = false;
  }

  try {
    const q = query(collection(db, "users"), where("team", "==", teamName), orderBy("name"));
    const snap = await getDocs(q);
    teamMembers.value = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("🔥 팀원 목록 로딩 실패:", err.message);
  } finally {
    isLoadingMembers.value = false;
  }
});

function goToAccept() {
  router.push("/team/accept");
}
</script>

<template>
  <div class="p-4">
    <header class="pb-4 mb-4">
      <h1 class="text-brand text-xl font-bold select-none">다다다</h1>
    </header>

    <!-- 🔄 유저 가입 여부 판단 중일 때 -->
    <div v-if="isUserLoading" class="space-y-2">
      <div class="h-16 w-full bg-zinc-100 rounded-xl animate-pulse" />
    </div>

    <!-- ✅ 팀에 가입된 경우 -->
    <div v-else-if="!notTeamed">
      <div v-if="userData?.role == 'member'">
        <label class="text-lg font-semibold">서비스</label>
        <button
          @click="goToAccept"
          class="cursor-pointer mt-2 mb-12 py-4 px-6 w-full flex flex-col items-start justify-center border border-zinc-200 rounded-xl bg-white"
        >
          <h1 class="text-zinc-700 font-semibold">팀원 등록</h1>
        </button>
      </div>

      <div>
        <label class="text-lg font-semibold">팀원 목록</label>

        <!-- 🔄 팀원 목록 로딩 중일 때 -->
        <ul v-if="isLoadingMembers" class="space-y-2">
          <li
            v-for="i in 5"
            :key="'skeleton-' + i"
            class="mt-2 px-6 gap-4 w-full flex py-4 items-center justify-start border border-zinc-200 rounded-xl bg-white animate-pulse"
          >
            <div class="w-14 h-14 rounded-full bg-zinc-200" />
            <div class="flex flex-col gap-2 w-full">
              <div class="h-4 w-24 bg-zinc-200 rounded"></div>
              <div class="h-3 w-40 bg-zinc-100 rounded"></div>
            </div>
          </li>
        </ul>

        <!-- ✅ 팀원 목록 표시 -->
        <ul v-else class="space-y-2">
          <li
            v-for="user in teamMembers"
            :key="user.id"
            class="mt-2 px-6 gap-4 w-full flex py-4 items-center justify-start border border-zinc-200 rounded-xl bg-white"
          >
            <img
              :src="user.profileImg || '/default-profile.png'"
              alt="profile"
              class="w-14 h-14 rounded-full object-cover bg-zinc-200"
            />
            <div class="flex flex-col overflow-hidden">
              <p class="text-lg font-semibold text-zinc-700">{{ user.name }}</p>
              <p class="text-sm text-zinc-500 truncate max-w-[200px]">
                {{ user.statusMsg || "상태메시지가 없습니다." }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- ❌ 팀에 미가입된 경우 -->
    <div v-else>아직 팀에 가입되지 않았어요...</div>
  </div>
</template>
