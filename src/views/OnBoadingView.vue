<template>
  <div class="flex flex-col h-full w-full select-none px-6 justify-between py-16">
    <div>
      <transition name="fade" appear>
        <h1 v-if="showLine1" class="text-3xl font-bold text-left leading-[1.3]">
          소통의 모든 것<br />
          <span class="text-blue-600 font-bold">다다다</span>에서 간편하게
        </h1>
      </transition>

      <transition name="fade" appear>
        <p v-if="showLine2" class="mt-8 text-lg text-zinc-600">
          <span class="font-semibold text-blue-600">다다다</span>를 통해 <br />
          팀원들과의 <span class="font-semibold text-blue-600">진짜 속마음</span>을 공유해보세요
        </p>
      </transition>
    </div>
    <transition name="slide-up">
      <button
        v-if="showButton"
        @click="goToRegister"
        class="cursor-pointer py-3 w-full text-white bg-blue-500 rounded-xl text-lg font-semibold transition"
      >
        시작하기
      </button>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const showLine1 = ref(false);
const showLine2 = ref(false);
const showButton = ref(false);

onMounted(() => {
  setTimeout(() => (showLine1.value = true), 100);
  setTimeout(() => (showLine2.value = true), 800);
  setTimeout(() => (showButton.value = true), 1500);
});

const goToRegister = () => {
  router.push("/register");
};
</script>

<style scoped>
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
